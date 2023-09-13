import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  describe('create student', () => {
    const result = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };

    const insertResult = {
      identifiers: [result],
      generatedMaps: [result],
      raw: result,
    };
    it('create student success', async () => {
      const spyCreate = jest
        .spyOn(service, 'create')
        .mockResolvedValue(insertResult);
      expect(await controller.create(result)).toEqual(insertResult);
      spyCreate.mockRestore();
    });
    it('create student fail', async () => {
      const spyCreate = jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.create(result)).rejects.toThrowError('Error');
      spyCreate.mockRestore();
    });
  });

  describe('find all students', () => {
    const findAllResult = [
      {
        id: 2,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
      {
        id: 1,
        name: 'Dasun',
        address: 'Galle',
        mobile: '0746578012',
        dob: new Date('2001-01-01'),
        gender: 'Male',
      },
    ];
    it('find all students success', async () => {
      const spyFindAll = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(findAllResult);
      expect(await controller.findAll()).toEqual(findAllResult);
      spyFindAll.mockRestore();
    });
    it('find all students fail', async () => {
      const spyFindAll = jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.findAll()).rejects.toThrowError('Error');
      spyFindAll.mockRestore();
    });
  });

  describe('update student', () => {
    const result = {
      id: 1,
      name: 'Dasun',
      address: 'Galle',
      mobile: '0746578012',
      dob: new Date('2001-01-01'),
      gender: 'Male',
    };
    const updateResult = {
      identifiers: [result],
      generatedMaps: [result],
      raw: result,
    };
    it('update student success', async () => {
      const spyUpdate = jest
        .spyOn(service, 'update')
        .mockResolvedValue(updateResult);
      expect(await controller.update('1', result)).toEqual(updateResult);
      spyUpdate.mockRestore();
    });
    it('update student fail', async () => {
      const spyUpdate = jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.update('1', result)).rejects.toThrowError(
        'Error',
      );
      spyUpdate.mockRestore();
    });
  });

  describe('remove student', () => {
    const removeResult = {
      raw: {
        affectedRows: 1,
        insertId: 0,
        changedRows: 0,
      },
    };
    it('remove student success', async () => {
      const spyRemove = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(removeResult);
      expect(await controller.remove('1')).toEqual(removeResult);
      spyRemove.mockRestore();
    });
    it('remove student fail', async () => {
      const spyRemove = jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('Error'));
      await expect(controller.remove('1')).rejects.toThrowError('Error');
      spyRemove.mockRestore();
    });
  });
});
