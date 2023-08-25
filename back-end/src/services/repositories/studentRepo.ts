import AppDataSource from "../../config/dataSoure";
import { Student } from "../../models/student";

//create student repo
const studentRepository = AppDataSource.getRepository(Student);
export default studentRepository;