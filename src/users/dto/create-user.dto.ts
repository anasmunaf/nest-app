import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Admin', 'User', 'Moderator'], {
    message: 'Valid role is required!',
  })
  role: 'Admin' | 'User' | 'Moderator';
}
