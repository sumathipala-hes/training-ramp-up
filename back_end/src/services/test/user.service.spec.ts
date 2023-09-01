// import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

// import { User } from '../../models/user.model';
// import { sendNotification } from '../../util/notification.util';
// import {
//   retrieveAllUsers,
//   registerUser,
//   updateUser,
//   deleteUser,
//   signInUser,
// } from '.././user.service';
// import { dataSource } from '../../configs/db.config';

// jest.mock('../../configs/db.config');

// jest.mock('../../util/notification.util', () => ({
//   sendNotification: jest.fn(),
// }));

// describe('User Service', () => {
//   describe('retrieveAllUsers', () => {
//     test('should fetch and return a list of users', async () => {
//       const mockUserData: User[] = [
//         // Mock user data for testing
//         {
//           userName: 'Pahasara',
//           userEmail: 'pahasara@gmail.com',
//           userPassword: '12345678',
//           role: 'Admin',
//         },
//       ];

//       const mockFind = jest.fn().mockResolvedValue(mockUserData);
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         find: mockFind,
//       });

//       const result = await retrieveAllUsers();

//       expect(result).toEqual(mockUserData);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFind).toHaveBeenCalledWith({ order: { userEmail: 'DESC' } });
//     });

//     it('should throw an error if fetching users fails', async () => {
//       const mockError = new Error('Mocked error');
//       const mockFind = jest.fn().mockRejectedValue(mockError);
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         find: mockFind,
//       });

//       await expect(retrieveAllUsers()).rejects.toThrow(mockError);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFind).toHaveBeenCalledWith({ order: { userEmail: 'DESC' } });
//     });
//   });

//   describe('registerUser', () => {
//     test('should create a new user', async () => {
//       const mockUserData: User = {
//         userName: 'Pahasara',
//         userEmail: 'pahasara@gmail.com',
//         userPassword: '12345678',
//         role: 'Admin',
//       };

//       const mockInsert = jest.fn().mockResolvedValue(new InsertResult());
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         insert: mockInsert,
//       });

//       const result = await registerUser(mockUserData);

//       expect(result).toEqual(new InsertResult()); // Adjust this based on your mock response
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockInsert).toHaveBeenCalledWith(mockUserData);
//       expect(sendNotification).toHaveBeenCalledWith(
//         'Success',
//         'User Registerd..!',
//       );
//     });

//     it('should throw an error if creating a user fails', async () => {
//       const mockError = new Error('Mocked error');
//       const mockInsert = jest.fn().mockRejectedValue(mockError);
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         insert: mockInsert,
//       });

//       const mockUserData: User = {
//         userName: 'Pahasara',
//         userEmail: 'pahasara@gmail.com',
//         userPassword: '12345678',
//         role: 'Admin',
//       };

//       await expect(registerUser(mockUserData)).rejects.toThrow(mockError);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockInsert).toHaveBeenCalledWith(mockUserData);
//     });
//   });

//   describe('updateUser', () => {
//     let mockUpdate: jest.Mock;

//     beforeEach(() => {
//       mockUpdate = jest.fn();
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         update: mockUpdate,
//       });
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     test('should update an existing user', async () => {
//       const email = '1';
//       const mockUserData: User = {
//         userName: 'Pahasara',
//         userEmail: 'pahasara@gmail.com',
//         userPassword: '12345678',
//         role: 'Admin',
//       };

//       const mockUpdateResult = new UpdateResult();
//       mockUpdateResult.affected = 1; // Simulate a successful update

//       mockUpdate.mockResolvedValue(mockUpdateResult);

//       const result = await updateUser(email, mockUserData);

//       expect(result).toEqual(mockUpdateResult);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockUpdate).toHaveBeenCalledWith(email, mockUserData);
//       expect(sendNotification).toHaveBeenCalledWith(
//         'Success',
//         'User Updated..!',
//       );
//     });

//     test('should throw an error if user is not found', async () => {
//       const email = '1';
//       const mockUserData: User = {
//         userName: 'Pahasara',
//         userEmail: 'pahasara@gmail.com',
//         userPassword: '12345678',
//         role: 'Admin',
//       };

//       const mockUpdateResult = new UpdateResult();
//       mockUpdateResult.affected = 0; // Simulate user not found

//       mockUpdate.mockResolvedValue(mockUpdateResult);

//       await expect(updateUser(email, mockUserData)).rejects.toThrow(
//         'User not found.',
//       );
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockUpdate).toHaveBeenCalledWith(email, mockUserData);
//     });

//     test('should throw an error if updating a user fails', async () => {
//       const email = 'pahasara@gmail.com';
//       const mockUserData: User = {
//         userName: 'Pahasara',
//         userEmail: 'pahasara@gmail.com',
//         userPassword: '12345678',
//         role: 'Admin',
//       };

//       const mockError = new Error('Mocked error');
//       mockUpdate.mockRejectedValue(mockError);

//       await expect(updateUser(email, mockUserData)).rejects.toThrow(mockError);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockUpdate).toHaveBeenCalledWith(email, mockUserData);
//     });
//   });

//   describe('deleteUser', () => {
//     let mockDelete: jest.Mock;

//     beforeEach(() => {
//       mockDelete = jest.fn();
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         delete: mockDelete,
//       });
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     test('should delete an existing user', async () => {
//       const email = 'pahasara@gmail.com';

//       const mockDeleteResult = new DeleteResult();
//       mockDeleteResult.affected = 1; // Simulate a successful deletion

//       mockDelete.mockResolvedValue(mockDeleteResult);

//       const result = await deleteUser(email);

//       expect(result).toEqual(mockDeleteResult);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockDelete).toHaveBeenCalledWith(email);
//       expect(sendNotification).toHaveBeenCalledWith(
//         'Success',
//         'User Deleted..!',
//       );
//     });

//     test('should throw an error if user is not found', async () => {
//       const email = 'pahasara@gmail.com';

//       const mockDeleteResult = new DeleteResult();
//       mockDeleteResult.affected = 0; // Simulate user not found

//       mockDelete.mockResolvedValue(mockDeleteResult);

//       await expect(deleteUser(email)).rejects.toThrow('User not found.');
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockDelete).toHaveBeenCalledWith(email);
//     });

//     test('should throw an error if deleting a user fails', async () => {
//       const email = 'pahasara@gmail.com';

//       const mockError = new Error('Mocked error');
//       mockDelete.mockRejectedValue(mockError);

//       await expect(deleteUser(email)).rejects.toThrow(mockError);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockDelete).toHaveBeenCalledWith(email);
//     });
//   });

//   describe('signInUser', () => {
//     let mockFindOne: jest.Mock;

//     beforeEach(() => {
//       mockFindOne = jest.fn();
//       dataSource.manager.getRepository = jest.fn().mockReturnValue({
//         findOne: mockFindOne,
//       });
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     const email = 'pahasara@gmail.com';
//     const password = '12345678';
//     const user = {
//       userName: 'Pahasara',
//       userEmail: 'pahasara@gmail.com',
//       userPassword: '12345678',
//       role: 'admin',
//     };

//     test('should sign in a user with correct credentials', async () => {
//       mockFindOne.mockResolvedValue(user);

//       const result = await signInUser(email, password);

//       expect(result).toEqual(user);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFindOne).toHaveBeenCalledWith({
//         where: {
//           userEmail: email,
//         },
//       });
//     });

//     test('should throw an error if user is not found', async () => {
//       mockFindOne.mockResolvedValue(null);

//       await expect(signInUser(email, password)).rejects.toThrowError(
//         'User not found',
//       );
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFindOne).toHaveBeenCalledWith({
//         where: {
//           userEmail: email,
//         },
//       });
//     });

//     test('should throw an error if password does not match', async () => {
//       mockFindOne.mockResolvedValue(user);

//       await expect(signInUser(email, 'wrongpassword')).rejects.toThrowError(
//         'Password not match',
//       );
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFindOne).toHaveBeenCalledWith({
//         where: {
//           userEmail: email,
//         },
//       });
//     });

//     test('should throw an error if signing in fails', async () => {
//       const mockError = new Error('Mocked error');
//       mockFindOne.mockRejectedValue(mockError);

//       await expect(signInUser(email, password)).rejects.toThrowError(mockError);
//       expect(dataSource.manager.getRepository).toHaveBeenCalledWith(User);
//       expect(mockFindOne).toHaveBeenCalledWith({
//         where: {
//           userEmail: email,
//         },
//       });
//     });
//   });
// });
