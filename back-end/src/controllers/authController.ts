import { Request, Response } from 'express'
import { User } from '../entities/user'
import jwt from 'jsonwebtoken'

const signToken = (id: number) => {
  console.log(process.env.JWT_SECRET)
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }
}

const signUp = async (req: Request, res: Response) => {
  const newUser = User.create({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  await newUser.save()

  //If Everythin is Ok Send a Token
  if (newUser?.id) {
    const token = signToken(newUser.id)
    res.status(200).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    })
  }
}

const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  //1)Check if Email and Password Exists
  if (!email || !password) {
    return res.status(400).json({ errors: 'Email Or Password is not given' })
  }

  //2)Check if User Exists and Password is Correct
  const user = await User.findOneBy({ email })
  if (user?.password) {
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({ errors: 'Incorrect Email or Password' })
    }
  }

  //If Everything is Ok,Send Token to the Client
  if (user?.id) {
    const token = signToken(user.id)
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (err) {
    console.error('Error No Students')
  }
}

export { signUp, logIn, getAllUsers }
