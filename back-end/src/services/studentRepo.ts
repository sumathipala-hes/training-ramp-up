import AppDataSource from "../config/dataSoure";
import { Student } from "../models/student";

const studentRepository = AppDataSource.getRepository(Student);
export default studentRepository;