import { NextFunction, Request, Response } from 'express'
import { User } from '../entities/user'
import jwt, { JwtPayload, verify } from 'jsonwebtoken'
import { validationResult } from 'express-validator'
// import { promisify } from 'util'
import jwt_decode from 'jwt-decode'
import { AppRoles } from '../util/Roles'
import { createUser, findAllUsers, findUserByEmail, findUserById } from '../services/authService'

const jwtSecret = process.env.JWT_SECRET || `Couldn't Find the config.env`
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '90d'
// const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || '90'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User // Attach the user object to the Request type
    }
  }
}

const signToken = (id: number) => {
  console.log(jwtSecret)
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  })
}

const createSendToken = (user: User, res: Response) => {
  const token = signToken(user.id)

  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 10),
    httpOnly: true,
    secure: false,
  }

  res.cookie('token', token, cookieOptions)

  //Remove the Password from output
  user.password = undefined

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

const signUp = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() })
    }

    const newUser = await createUser(req.body.email, req.body.userName, req.body.password)
    console.log(newUser)
    //If Everythin is Ok Send a Token
    if (newUser) {
      createSendToken(newUser, res)
    }
  } catch (err) {
    console.log(`Couldn't Sign up with details that has given, ${err}`)
  }
}

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    //1)Check if Email and Password Exists
    if (!email || !password) {
      console.log('Email Or Password is not given')
      return res.status(400).json({ errors: 'Email Or Password is not given' })
    }

    //2)Check if User Exists and Password is Correct
    const user = await findUserByEmail(email)

    if (user?.password) {
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(400).json({ errors: 'Incorrect Email or Password' })
      }
    } else {
      console.log('Couldnt Find a User with this Email')
    }

    //3)If Everything is Ok,Send Token to the Client
    if (user) {
      createSendToken(user, res)
    }
  } catch (err) {
    console.log(`Couldn't Log in ,${err}`)
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ status: 'fail', error: `You're Not Logged In, Please Log in and Try agin` })
  }

  try {
    //2) Validate Token (Verification)
    const verifiedJWT = verify(token, jwtSecret)
    if (verifiedJWT) {
      const decoded = jwt_decode(token) as JwtPayload
      // //3)Check if user still exists
      const currentUser = await findUserById(decoded.id)

      if (!currentUser) {
        return res.status(401).json({ status: 'fail', message: `The User belonging to this token No Longer Exists` })
      } else {
        req.user = currentUser
        return next()
      }
    } else {
      return res.status(401).json({ status: 'fail', message: `The Token is Unautharized` })
    }
  } catch (err) {
    return res.status(401).json({ status: 'fail', message: 'The Token is not verified' })
  }
}

export const restrictToAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    const userRole = req.user.roles

    if (userRole[0] !== 'ADMIN') {
      return res.status(403).json({ error: 'You do not have permission to perform this action' })
    }

    next()
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers()
    return res.json(users)
  } catch (err) {
    console.error('Error No Students')
  }
}

const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const newRole: AppRoles = await req.body.userRole

    const user = await User.findOneById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.roles = newRole
    await User.save(user)
    return res.status(200).json({ status: 'success', message: `The User Role is Updated` })
  } catch (err) {
    console.error(err)
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const response = await User.delete(userId)
    return res.status(200).json({ status: 'success', message: `The User is Deleted`, response })
  } catch (err) {
    console.log(err)
  }
}

export { signUp, logIn, protect, getAllUsers, deleteUser, updateUserRole }
