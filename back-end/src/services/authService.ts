import { User } from '../entities/user'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || `Couldn't Find the config.env`
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d'
// const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || '90'

const createUser = async (email: string, userName: string, password: string) => {
  try {
    const newUser = User.create({ email: email, userName: userName, password: password })
    await newUser.save()
    return newUser
  } catch (err) {
    throw Error(`Values Haven't provided properly`)
  }
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

const signToken = (id: number, email: string) => {
  const refreshToken = jwt.sign({ email: email }, jwtSecret, { expiresIn: '90d' })

  const accessToken = jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  })
  return { accessToken, refreshToken }
}

const createSendToken = (user: User, res: Response) => {
  const token = signToken(user.id, user.email)

  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: true,
    secure: false,
  }

  res.cookie('accessToken', token.accessToken, cookieOptions)
  res.cookie('refreshToken', token.refreshToken, {
    maxAge: 60 * 60 * 24 * 1000,
    httpOnly: true,
  })

  //Remove the Password from output
  // user.password = undefined

  res.status(200).json({
    status: 'success',
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    data: {
      user,
    },
  })
}

export { createUser, findUserByEmail, findUserById, findAllUsers, createSendToken, signToken }
