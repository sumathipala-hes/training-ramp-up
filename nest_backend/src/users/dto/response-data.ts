import { User } from '../entities/user.entity';

export class UserResponseData {
  message: string;
  data: User[];
}
