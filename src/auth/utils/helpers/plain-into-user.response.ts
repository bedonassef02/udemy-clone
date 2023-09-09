import { UserResponseDto } from '../../../users/dto/user-response.dto';

export function plainIntoUserResponse(user: any): UserResponseDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
