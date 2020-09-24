import { IsDefined, IsString, Matches, Length } from "class-validator";

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
    @Matches(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    email: string;

}