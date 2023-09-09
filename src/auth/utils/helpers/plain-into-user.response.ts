import { UserResponseDto } from '../../../users/dto/user-response.dto';
import { UserDocument } from '../../../users/entities/user.entity';

export function plainIntoUserResponse(user: UserDocument): UserResponseDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
