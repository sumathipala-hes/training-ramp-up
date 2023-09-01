// import { DeleteResult, UpdateResult } from 'typeorm';
// import { dataSource } from '../../configs/db.config';
// import { Student } from '../../models/student.model';
// import { sendNotification } from '../../util/notification.util';
// import {
//   retrieveAllStudents,
//   saveStudent,
//   updateStudent,
//   deleteStudent,
// } from '../../services/student.service';

// jest.mock('../../util/notification.util', () => ({
//   sendNotification: jest.fn(),
// }));

// describe('Student Controller', () => {
//   const studentRepo = dataSource.manager.getRepository(Student);

//   describe('Retrieve All students', () => {
//     const allStudents = [
//       {
//         studentId: 1,
//         studentName: 'Maneesha',
//         studentAddress: 'Panadura',
//         studentMobile: '0717133074',
//         studentDob: new Date('2001-01-01'),
//         studentGender: 'Male',
//       },
//     ];

//     test('should retrieve all students successfully', async () => {
//       studentRepo.find = jest.fn().mockResolvedValue(allStudents);
//       const data = await retrieveAllStudents();
//       expect(data).toEqual(allStudents);
//     });

//     test('should handle failure to retrieve all students', async () => {
//       studentRepo.find = jest.fn().mockRejectedValue(new Error('Error'));
//       await expect(retrieveAllStudents()).rejects.toThrowError('Error');
//     });
//   });

//   describe('Create student', () => {
//     const newStudent = {
//       studentId: 1,
//       studentName: 'Pahasara',
//       studentAddress: 'Galle',
//       studentMobile: '0717133074',
//       studentDob: new Date('2001-08-04'),
//       studentGender: 'Male',
//     };

//     test('should create student successfully', async () => {
//       studentRepo.insert = jest.fn().mockResolvedValue(newStudent);
//       const data = await saveStudent(newStudent);
//       expect(data).toEqual(newStudent);
//       expect(sendNotification).toHaveBeenCalledWith(
//         'Success',
//         'student Saved..!',
//       );
//     });

//     test('should handle failure to create student', async () => {
//       studentRepo.insert = jest.fn().mockRejectedValue(new Error('Error'));
//       await expect(saveStudent(newStudent)).rejects.toThrowError('Error');
//     });
//   });

//   describe('Update student', () => {
//     const updatedStudent: Student = {
//       studentId: 1,
//       studentName: 'Pahasara',
//       studentAddress: 'Panadura',
//       studentMobile: '0717133074',
//       studentDob: new Date('2001-08-04'),
//       studentGender: 'Male',
//     };

//     test('should update student successfully', async () => {
//       const mockUpdateResult: UpdateResult = {
//         affected: 1,
//         raw: updatedStudent,
//         generatedMaps: [],
//       };
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         update: jest.fn().mockResolvedValue(mockUpdateResult),
//       });

//       const result = await updateStudent('1', updatedStudent);
//       expect(result).toEqual(mockUpdateResult);
//       expect(sendNotification).toHaveBeenCalledWith(
//         'Success',
//         'student Updated..!',
//       );
//     });

//     test('should handle failure to update student', async () => {
//       const errorMessage = 'Error updating student.';
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         update: jest.fn().mockRejectedValue(new Error(errorMessage)),
//       });

//       await expect(updateStudent('1', updatedStudent)).rejects.toThrowError(
//         errorMessage,
//       );
//     });
//   });

//   describe('Delete student', () => {
//     const id = '1';

//     test('should delete student successfully', async () => {
//       const mockDeleteResult: DeleteResult = {
//         affected: 1,
//         raw: undefined,
//       }; // Mimic successful delete
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         delete: jest.fn().mockResolvedValue(mockDeleteResult),
//       });

//       const result = await deleteStudent(id);
//       expect(result).toEqual(mockDeleteResult);
//       expect(sendNotification).toHaveBeenCalledWith('', 'student Deleted..!');
//     });

//     test('should handle failure to delete student', async () => {
//       const errorMessage = 'Error deleting student.';
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         delete: jest.fn().mockRejectedValue(new Error(errorMessage)),
//       });

//       await expect(deleteStudent(id)).rejects.toThrowError(errorMessage);
//     });
//   });
// });
