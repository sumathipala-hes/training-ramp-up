/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { StudentService } from "./student.service"
import { Student } from "./entities/student.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { describe } from "node:test";
import { StudentDto } from "./dto/student.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateStudentDto } from "./dto/update.dto";

const mockStudentRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('StudentService', () => {
    let studentService: StudentService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let studentRepository: Repository<Student>;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentService,
                {
                    provide: getRepositoryToken(Student),
                    useValue: mockStudentRepository,
                },
            ],
        }).compile();

        studentService = module.get<StudentService>(StudentService);
        studentRepository = module.get<Repository<Student>>(getRepositoryToken(Student)); 
    });

    it('should be defined', () => {
        expect(studentService).toBeDefined();
    });

    it('should get all student details', async() => {
        const mockStudents: Student[] = [
            {
                id: 1,
                name: 'Lily',
                gender: 'Female',
                address: 'New York',
                mobile: '9876543210',
                dob: '1998-04-04',
                age: 25,
            },
            {
                id: 2,
                name: 'James',
                gender: 'Male',
                address: 'New York',
                mobile: '9876543210',
                dob: '1996-04-04',
                age: 27,
            },
        ];

        mockStudentRepository.find.mockResolvedValue(mockStudents);
        const students = await studentService.getStudents();

        expect(students).toEqual(mockStudents);
        expect(mockStudentRepository.find).toHaveBeenCalledWith();
    });

    it('should create a student', async() => {
        const studentDtO: StudentDto = {
            name: 'Lily',
            gender: 'Female',
            address: 'New York',
            mobile: '9876543210',
            dob: '1998-04-04',
            age: 25,
        };

        const student = new Student();
        student.name = studentDtO.name;
        student.gender = studentDtO.gender;
        student.address = studentDtO.address;
        student.mobile = studentDtO.mobile;
        student.dob = studentDtO.dob;
        student.age = studentDtO.age;

        mockStudentRepository.create.mockReturnValue(student);
        mockStudentRepository.save.mockReturnValue(student);

        const createdStudent = await studentService.createStudent(studentDtO);
        expect(createdStudent).toEqual(student);
    });

    describe('update a student', async() => {
        it('should update a student successfully', async() => {
            const id = '1';
            const updateStudentDto: UpdateStudentDto = {
                name: 'James',
                age: 20,
            };
            const existingStudent: Student = {
                id: 1,
                name: 'Seth',
                gender: 'Male',
                address: 'New York',
                mobile: '9876543210',
                dob: '1998-04-04',
                age: 25,
            };
            mockStudentRepository.findOneBy.mockResolvedValue(existingStudent);
            
            await studentService.updateStudent(id, updateStudentDto);
            expect(mockStudentRepository.findOneBy).toHaveBeenCalledWith({id: parseInt(id)});
            expect(mockStudentRepository.update).toHaveBeenCalledWith(id, updateStudentDto);
        });
        it('should throw an error when updating a student that does not exist', async() => {
            const id = '999';
            const updateStudentDto: UpdateStudentDto = {
                name: 'James',
                age: 20,
            };
            mockStudentRepository.findOneBy.mockResolvedValue(null);
            await expect(studentService.updateStudent(id, updateStudentDto)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('delete a student', async() => {
        it('should delete a student successfully', async() => {
            const id = '1';
            const deleteResult = { affected: 1};

            mockStudentRepository.delete.mockResolvedValue(deleteResult);
            await studentService.deleteStudent(id);
            expect(mockStudentRepository.delete).toHaveBeenCalledWith(id);
        });
        it('should throw an error when deleting a student that does not exist', async() => {
            const id = '999';
            const deleteResult = { affected: 0};

            mockStudentRepository.delete.mockResolvedValue(deleteResult);
            await expect (studentService.deleteStudent(id)).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});