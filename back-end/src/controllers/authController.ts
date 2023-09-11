import { NextFunction, Request, Response, response } from 'express'
import { User } from '../entities/user'
import { JwtPayload, verify } from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import jwt_decode from 'jwt-decode'
import { AppRoles } from '../util/Roles'
import {
  createSendToken,
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  signToken,
} from '../services/authService'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User // Attach the user object to the Request type
    }
  }
}

const jwtSecret = process.env.JWT_SECRET || `Couldn't Find the config.env`

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
    newUser.password = undefined
    createSendToken(newUser, res)
    if (newUser) {
      return { newUser, status: 200 }
    } else {
      return { status: 403 }
    }
  } catch (err) {
    console.log(`Couldn't Sign up with details that has given, ${err}`)
  }
}
const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() })
    }

    const newUser = await createUser(req.body.email, req.body.userName, req.body.password)
    console.log(newUser)
    //If Everythin is Ok Send a Token
    newUser.password = undefined
    if (newUser) {
      return { newUser, status: 200 }
    } else {
      return { status: 403 }
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

    //2)Check if User Exists and Password is Correctoiuygfdsatr
    const user = await findUserByEmail(email)

    if (user?.password) {
      if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(400).json({ errors: 'Incorrect Email or Password' })
      }
    }

    //3)If Everything is Ok,Send Token to the Client
    if (user) {
      user.password = undefined
      createSendToken(user, res)
      return { user, status: 200 }
    } else {
      return { status: 403 }
    }
  } catch (err) {
    console.log(`Couldn't Log in ,${err}`)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logOut = async (req: Request, res: Response) => {
  console.log('Log Out Controller Reached Successfully')
  // Set the expiration time of both access and refresh tokens to "right now."
  res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true, secure: false })

  // Expire the refresh token cookie
  res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, secure: false })
  return res.status(200).json({ message: 'Logged out successfully' })
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  try {
    if (accessToken) {
      const verifiedJWTAT = verify(accessToken, jwtSecret)
      const decoded = jwt_decode(accessToken) as JwtPayload
      let currentUser
      if (verifiedJWTAT) {
        console.log(decoded.exp, Date.now() / 1000)
        currentUser = await findUserById(decoded.id)
        if (!currentUser) {
          return res.status(401).json({ status: 'fail', message: `The User belonging to this token No Longer Exists` })
        }

        req.user = currentUser
        return next()
      }
    } else if (refreshToken) {
      return res
        .status(402)
        .json({ status: 'refresh', message: `Access Token is Expired,check If Token can be refreshed`, refreshToken })
    }
    if (!accessToken && !refreshToken) {
      return res.status(500).json({ status: 'fail', message: `You're logged out, Please log In again` })
    }
  } catch (err) {
    console.error(err)
  }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return response.status(403).json({ status: 'fail', message: 'Both Tokens are Expired, Please Log in Again' })
    }
    const verifiedJWTRT = verify(refreshToken, jwtSecret)
    const decoded = jwt_decode(refreshToken) as JwtPayload

    if (verifiedJWTRT) {
      const currentUser = await findUserById(decoded.id)
      if (currentUser) {
        const newAccessToken = signToken(currentUser.id, currentUser.email)
        res.cookie('accessToken', newAccessToken.accessToken, {
          expires: new Date(Date.now() + 300000),
          httpOnly: true,
          secure: false,
        })
        req.user = currentUser
        return next()
      }
    }
  } catch (err) {
    console.log(err)
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

    const user = await findUserById(parseInt(userId))
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

export { signUp, logIn, protect, getAllUsers, deleteUser, updateUserRole, createSendToken, logOut, registerUser }
