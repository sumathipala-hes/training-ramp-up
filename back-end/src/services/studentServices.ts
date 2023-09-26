import { Student } from '../entities/student'

const createStudentDB = async (
  id: number,
  name: string,
  age: string,
  date_of_birth: Date,
  gender: string,
  mobile_number: number,
  address: string,
) => {
  const student = Student.create({
    id,
    name,
    age,
    date_of_birth,
    gender,
    mobile_number,
    address,
  })

  await student.save()

  return student
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateStudentDB = async (id: number, data: any) => {
  const updatedStudent = Student.update(id, data)
  return updatedStudent
}

const deleteStudentDB = async (id: number) => {
  const response = await Student.delete(id)
  return response
}

export { createStudentDB, updateStudentDB, deleteStudentDB }