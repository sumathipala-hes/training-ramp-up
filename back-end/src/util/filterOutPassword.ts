/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

const filterOutPassword = (req: Request, res: Response, next: NextFunction) => {
  console.log(res.locals.data)
  if (res.locals.user) {
    delete res.locals.user.password
  }
  next()
}

export default filterOutPassword
