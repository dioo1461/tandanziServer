import { isNumber, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateJournalDto {
    @IsNumber()
    readonly date: number;

    
    readonly 
}
