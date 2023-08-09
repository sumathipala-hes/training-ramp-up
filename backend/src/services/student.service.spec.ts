import { dataSource } from "../configs/dataSourceConfig";
import { Student } from "../models/student.model";

describe('Student Controller Checked', () => {

  const mockRepository = {

    find: jest.fn().mockResolvedValue([
      {
        id: 2,
        name: 'Ramal',
        address: 'Colombo',
        mobile: '0763453534',
        dob: new Date('2001-01-01'), // Corrected date format
        gender: 'Male',
      },
      {
        id: 1,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0763453534',
        dob: new Date('2000-08-08'), // Corrected date format
        gender: 'Male',
      },
    ]),
  };
  const mockManager = {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  };

  describe('GetAllStudents', () => {
    test('should return an array of students', async () => {

      const result = await mockManager.getRepository(Student).find(
        { order: { id: 'DESC' } },
      );
      expect(result).toEqual([
      {
        id: 2,
        name: 'Ramal',
        address: 'Colombo',
        mobile: '0763453534',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
      {
        id: 1,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0763453534',
        dob: new Date('2000-08-08'),
        gender: 'Male',
      },
      ]);

      expect(mockManager.getRepository).toHaveBeenCalledTimes(1);
      expect(mockManager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
      });
    });

    test('should throw an error', async () => {
      const mockRepository = {
        find: jest.fn().mockRejectedValue(new Error('Error')),
      };

      const mockManager = {
        getRepository: jest.fn().mockReturnValue(mockRepository),
      };

      await expect(
        mockManager.getRepository(Student).find({ order: { id: 'DESC' } }),
      ).rejects.toThrowError('Error');

      expect(mockManager.getRepository).toHaveBeenCalledTimes(1);
      expect(mockManager.getRepository).toHaveBeenCalledWith(Student);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { id: 'DESC' },
      });
    });
  });



  describe('CreateStudent', () => {
    test('should return a new student', async () => {
    });
  });

});
