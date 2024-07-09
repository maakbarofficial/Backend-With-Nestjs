import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['ADMIN', 'HR', 'USER'], {
        message: "Valid role required"
    })
    role: 'ADMIN' | 'HR' | 'USER';
}