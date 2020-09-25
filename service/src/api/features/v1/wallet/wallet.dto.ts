import { IsDefined, IsString, Matches, Length, IsNumber, IsPositive } from "class-validator";

export class ReqRechargeWalletDto {
    @IsDefined()
    @IsString()
    @Length(1, 50)
    document: string;

    @IsDefined()
    @IsString()
    @Length(1, 50)
    phoneNumber: string;

    @IsDefined()
    @IsNumber()
    @IsPositive()
    ammount: number;
}