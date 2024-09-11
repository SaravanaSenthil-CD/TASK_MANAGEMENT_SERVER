import { IsString,IsEmail,IsOptional } from "class-validator";

export class CreateUserDTO{
    @IsString()
    username:string;

    @IsString()
    password:string;

    @IsOptional()
    @IsEmail()
    email?:string;
}