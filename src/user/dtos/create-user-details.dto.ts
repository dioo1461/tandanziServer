import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateUserDetailsDto {
    @IsOptional()
    @IsNumber()
    readonly age: number | null;

    @IsOptional()
    @IsNumber()
    readonly height: number | null;

    @IsOptional()
    @IsNumber()
    readonly weight: number | null;

    @IsOptional()
    @IsObject()
    readonly Inbody: InbodyDto | null;

}

class InbodyDto {
    @IsOptional()
    @IsNumber()
    readonly bodyFatPercentage: number | null;

}