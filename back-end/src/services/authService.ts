import { User } from '../entities/user'

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

export { createUser, findUserByEmail, findUserById, findAllUsers }
