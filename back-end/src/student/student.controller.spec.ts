import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from 'src/models/student.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Response } from 'express';
import { mockRequest, mockStudent, studentsMock } from 'src/utils';
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
} as unknown as Response;

describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;

  class MockSocketGateway {
    server = {
      emit: jest.fn(),
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            find: () => {
              return studentsMock;
            },
            insert: () => {
              return jest.fn();
            },
            findOneBy: () => {
              return studentsMock[0];
            },
            remove: () => {
              return jest.fn();
            },
            save: () => {
              return jest.fn();
            },
          },
        },
        {
          provide: SocketGateway,
          useClass: MockSocketGateway,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllStudents', () => {
    it('should return a list of students', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const fetchStudentsSpy = jest.spyOn(studentService, 'fetchStudents');
      fetchStudentsSpy.mockResolvedValue(studentsMock);

      // Act
      await controller.getAllStudents(mockRequest, mockResponse);

      // Assert
      expect(fetchStudentsSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
        data: studentsMock,
      });
    });

    it('should handle errors and return a 400 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const fetchStudentsSpy = jest.spyOn(studentService, 'fetchStudents');
      fetchStudentsSpy.mockRejectedValue(new Error('An error occurred'));

      // Act
      await controller.getAllStudents(mockRequest, mockResponse);

      // Assert
      expect(fetchStudentsSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'An error occurred',
      });
    });

    it('should handle unknown errors and return a 500 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const fetchStudentsSpy = jest.spyOn(studentService, 'fetchStudents');
      fetchStudentsSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.getAllStudents(mockRequest, mockResponse);

      // Assert
      expect(fetchStudentsSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('addStudent', () => {
    it('should successfully add a student', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const saveStudentSpy = jest.spyOn(studentService, 'saveStudent');
      saveStudentSpy.mockResolvedValue(true);

      // Act
      await controller.addStudent(mockStudent, mockResponse);

      // Assert
      expect(saveStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
      });
    });

    it('should handle errors and return a 400 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const saveStudentSpy = jest.spyOn(studentService, 'saveStudent');
      saveStudentSpy.mockRejectedValue(
        new Error('Failed to save the student data'),
      );

      // Act
      await controller.addStudent(mockStudent, mockResponse);

      // Assert
      expect(saveStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'Failed to save the student data',
      });
    });

    it('should handle unknown errors and return a 500 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const saveStudentSpy = jest.spyOn(studentService, 'saveStudent');
      saveStudentSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.addStudent(mockStudent, mockResponse);

      // Assert
      expect(saveStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('removeStudent', () => {
    it('should successfully remove a student', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const deleteStudentSpy = jest.spyOn(studentService, 'deleteStudent');
      deleteStudentSpy.mockResolvedValue(true);

      // Act
      await controller.removeStudent({ id: 5 }, mockResponse);

      // Assert
      expect(deleteStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
      });
    });

    it('should handle the case when no student data is found', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const deleteStudentSpy = jest.spyOn(studentService, 'deleteStudent');
      deleteStudentSpy.mockResolvedValue(false);

      // Act
      await controller.removeStudent(mockStudent, mockResponse);

      // Assert
      expect(deleteStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'No Student data found',
      });
    });

    it('should handle errors and return a 400 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const deleteStudentSpy = jest.spyOn(studentService, 'deleteStudent');
      deleteStudentSpy.mockRejectedValue(
        new Error('Failed to delete the student'),
      );

      // Act
      await controller.removeStudent({ id: 5 }, mockResponse);

      // Assert
      expect(deleteStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'Failed to delete the student',
      });
    });

    it('should handle unknown errors and return a 500 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const deleteStudentSpy = jest.spyOn(studentService, 'deleteStudent');
      deleteStudentSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.removeStudent({ id: 5 }, mockResponse);

      // Assert
      expect(deleteStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });

  describe('updateStudent', () => {
    it('should successfully update a student', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const updateStudentSpy = jest.spyOn(studentService, 'updateStudent');
      updateStudentSpy.mockResolvedValue(true);

      // Act
      await controller.updateStudent(mockStudent, mockResponse);

      // Assert
      expect(updateStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 200,
      });
    });

    it('should handle the case when no student data is found', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const updateStudentSpy = jest.spyOn(studentService, 'updateStudent');
      updateStudentSpy.mockResolvedValue(false);

      // Act
      await controller.updateStudent(mockStudent, mockResponse);

      // Assert
      expect(updateStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'No Student data found',
      });
    });

    it('should handle errors and return a 400 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const updateStudentSpy = jest.spyOn(studentService, 'updateStudent');
      updateStudentSpy.mockRejectedValue(
        new Error('Failed to update the student'),
      );

      // Act
      await controller.updateStudent(mockStudent, mockResponse);

      // Assert
      expect(updateStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 400,
        error: 'Failed to update the student',
      });
    });

    it('should handle unknown errors and return a 500 response', async () => {
      // Arrange
      const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
      };
      const updateStudentSpy = jest.spyOn(studentService, 'updateStudent');
      updateStudentSpy.mockRejectedValue('An unknown error occurred');

      // Act
      await controller.updateStudent(mockStudent, mockResponse);

      // Assert
      expect(updateStudentSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 500,
        error: 'An unknown error occurred.',
      });
    });
  });
});
