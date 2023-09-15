import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: StudentService,
          useValue: {
            saveStudent: jest.fn(),
            retrieveAllStudents: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createStudent', () => {
    const createStudentDto: CreateStudentDto = {
      studentId: 1,
      studentName: 'Maneesha',
      studentAddress: 'Panadura',
      studentMobile: '0717133074',
      studentDob: new Date('2001-01-01'),
      studentGender: 'Male',
    };

    it('should return a student', async () => {
      const mockInsertResult = {
        generatedMaps: [{ studentId: 1 }],
        raw: {},
        identifiers: [],
      };

      jest.spyOn(service, 'saveStudent').mockResolvedValue(mockInsertResult);
      await controller.create(createStudentDto);
      expect(service.saveStudent).toHaveBeenCalledWith(createStudentDto);
      expect(mockInsertResult).toEqual(mockInsertResult);
    });

    it('should fail in student creation and throw an error', async () => {
      jest.spyOn(service, 'saveStudent').mockRejectedValue(new Error());
      await expect(controller.create(createStudentDto)).rejects.toThrowError();
    });

    it('should fail and throw an error if student already exists', async () => {
      jest
        .spyOn(service, 'saveStudent')
        .mockRejectedValue(new Error('Student already exists'));
      await expect(controller.create(createStudentDto)).rejects.toThrow(
        'Student already exists',
      );
    });
  });

  describe('retrieveAllStudents', () => {
    const findAllResult = [
      {
        studentId: 2,
        studentName: 'Pasan',
        studentAddress: 'Panadura',
        studentMobile: '0717133074',
        studentDob: new Date('2001-01-01'),
        studentGender: 'Male',
      },
      {
        studentId: 1,
        studentName: 'Pahasara',
        studentAddress: 'Galle',
        studentMobile: '0717133074',
        studentDob: new Date('2001-01-04'),
        studentGender: 'Male',
      },
    ];
    it('find all students success', async () => {
      jest
        .spyOn(service, 'retrieveAllStudents')
        .mockResolvedValue(findAllResult as any);
      expect(await controller.retrieveAll()).toEqual(findAllResult);
    });

    it('find all students fail', async () => {
      jest
        .spyOn(service, 'retrieveAllStudents')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.retrieveAll()).rejects.toThrowError('Error');
    });
  });

  describe('updateStudent', () => {
    const studentId = '1';
    const updateStudentDto: UpdateStudentDto = {
      studentId: 1,
      studentName: 'Maneesha',
      studentAddress: 'Panadura',
      studentMobile: '0717133074',
      studentDob: new Date('2001-01-01'),
      studentGender: 'Male',
    };

    it('should return a student', async () => {
      const updateStudentResult: UpdateResult = {
        affected: 1,
        generatedMaps: [],
        raw: [],
      };

      jest
        .spyOn(service, 'updateStudent')
        .mockResolvedValue(updateStudentResult);

      await controller.update(studentId, updateStudentDto);

      expect(service.updateStudent).toHaveBeenCalledWith(
        Number(studentId),
        updateStudentDto,
      );
      expect(updateStudentResult).toEqual(updateStudentResult);
    });

    it('should fail in student update and throw an error', async () => {
      jest.spyOn(service, 'updateStudent').mockRejectedValue(new Error());

      await expect(
        controller.update(studentId, updateStudentDto),
      ).rejects.toThrowError();
    });

    it('should fail and throw an error if student does not exists', async () => {
      jest
        .spyOn(service, 'updateStudent')
        .mockRejectedValue(new Error('Student does not exists'));

      await expect(
        controller.update(studentId, updateStudentDto),
      ).rejects.toThrowError('Student does not exists');
    });
  });

  describe('removeStudent', () => {
    const id = '1';
    it('should delete a student and return success response', async () => {
      const mockDeleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest.spyOn(service, 'deleteStudent').mockResolvedValue(mockDeleteResult);

      await controller.remove(id);

      expect(service.deleteStudent).toHaveBeenCalledWith(Number(id));
      expect(mockDeleteResult).toEqual(mockDeleteResult);
    });

    it('should fail in student deletion and throw an error', async () => {
      jest.spyOn(service, 'deleteStudent').mockRejectedValue(new Error());

      await expect(controller.remove(id)).rejects.toThrowError();
    });

    it('should fail and throw an error if student does not exists', async () => {
      jest
        .spyOn(service, 'deleteStudent')
        .mockRejectedValue(new Error('Student does not exists'));

      await expect(controller.remove(id)).rejects.toThrowError(
        'Student does not exists',
      );
    });
  });
});
