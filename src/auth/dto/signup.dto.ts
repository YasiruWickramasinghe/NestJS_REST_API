import {
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['user','admin'])
    userRole: string = 'user';

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
  }
  