import { User } from '../entities/user'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || `Couldn't Find the config.env`
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '90d'
// const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || '90'

const createUser = async (email: string, userName: string, password: string) => {
  const newUser = User.create({ email: email, userName: userName, password: password })
  await newUser.save()
  return newUser
}

const findUserByEmail = async (email: string) => {
  const user = await User.findOneBy({ email })
  return user
}

const findUserById = async (id: number) => {
  const user = await User.findOneBy({ id })
  return user
}

const findAllUsers = async () => {
  const users = await User.find()
  return users
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

export { createUser, findUserByEmail, findUserById, findAllUsers, createSendToken, signToken }
