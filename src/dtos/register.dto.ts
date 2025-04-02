import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password!: string;
}
