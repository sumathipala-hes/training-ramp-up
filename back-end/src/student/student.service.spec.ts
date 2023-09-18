import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from 'src/models/student.entity';
import { studentsMock } from 'src/utils';

describe('StudentService', () => {
  let service: StudentService;

  class MockSocketGateway {
    server = {
      emit: jest.fn(),
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return student objects from DB', async () => {
    const res = await service.fetchStudents();
    expect(res).toEqual(studentsMock);
  });

  it('should save student to DB', async () => {
    const res = await service.saveStudent(studentsMock[0]);
    expect(res).toEqual(true);
  });

  it('should delete student from DB', async () => {
    const res = await service.deleteStudent({ id: 50 });
    expect(res).toEqual(true);
  });

  it('should update student from DB', async () => {
    const res = await service.updateStudent(studentsMock[0]);
    expect(res).toEqual(true);
  });

  it('should return false when try to update invalid student', async () => {
    const moduleNull: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findOneBy: () => {
              return null;
            },
          },
        },
        {
          provide: SocketGateway,
          useClass: MockSocketGateway,
        },
      ],
    }).compile();
    service = moduleNull.get<StudentService>(StudentService);

    const res = await service.updateStudent(studentsMock[0]);
    expect(res).toEqual(false);
  });

  it('should return false when try to delete invalid student', async () => {
    const moduleNull: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findOneBy: () => {
              return null;
            },
          },
        },
        {
          provide: SocketGateway,
          useClass: MockSocketGateway,
        },
      ],
    }).compile();
    service = moduleNull.get<StudentService>(StudentService);

    const res = await service.deleteStudent({ id: 50 });
    expect(res).toEqual(false);
  });
});
