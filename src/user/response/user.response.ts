import { Exclude } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

export class UserResponce extends UserDto {
  @Exclude()
  password: string;
}
