class StudentService {
  public getAllStudents() {
    console.log('Get All Students');
  }

  public getStudentById(id: string) {
    console.log('Get Student By Id');
  }

  public createStudent(studentData: any) {
    console.log('Create Student');
  }

  public updateStudent(id: string, studentData: any) {
    console.log('Update Student');
  }

  public deleteStudent(id: string) {
    console.log('Delete Student');
  }
}

export default new StudentService();
