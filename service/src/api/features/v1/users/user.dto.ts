import { IsDefined, IsString, Matches, Length, IsNumber, IsPositive } from "class-validator";

export class ReqCreateUserDto {

    @IsDefined()
    @IsString()
    @Length(1, 50)
    document: string;

    @IsDefined()
    @IsString()
    @Length(1, 50)
    name: string;

    @IsDefined()
    @IsString()
    @Length(1, 50)
    phoneNumber: string;

    @IsDefined()
    @Matches(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), { message: 'Invalid email' })
    email: string;

}

export class ReqUserInfoDto {
    @IsDefined()
    @IsString()
    @Length(1, 50)
    phoneNumber: string;

    @IsDefined()
    @IsString()
    @Length(1, 50)
    document: string;
}

export class ReqPurchaseDto {
    @IsDefined()
    @IsString()
    @Length(1, 50)
    phoneNumber: string;

    @IsDefined()
    @IsString()
    @Length(1, 50)
    document: string;

    @IsDefined()
    @IsNumber()
    @IsPositive()
    ammount: number;
}

export class ReqVerifyPurchaseDto {
    @IsDefined()
    @IsString()
    @Length(6, 6)
    confirmationCode: string;

    @IsDefined()
    @IsString()
    sessionToken: string;
}