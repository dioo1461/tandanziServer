import { isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateProfileDto {
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
    @IsNumber()
    readonly bodyWater: number | null;

    @IsOptional()
    @IsNumber()
    readonly bodyProtein: number | null;

    @IsOptional()
    @IsNumber()
    readonly bodyMineral: number | null;

    @IsOptional()
    @IsNumber()
    readonly bodyFat: number | null;

    @IsOptional()
    @IsNumber()
    readonly waistHipRatio: number | null;

}
