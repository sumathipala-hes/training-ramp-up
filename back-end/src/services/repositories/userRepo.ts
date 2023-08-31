import AppDataSource from "../../config/dataSoure";
import { User } from "../../models/user";

//create user repo
const userRepository = AppDataSource.getRepository(User);
export default userRepository;