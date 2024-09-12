import { IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsEnum(['Admin', 'User', 'Moderator'], {
    message: 'Valid role is required!',
  })
  role: 'Admin' | 'User' | 'Moderator';
}
