import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'descricao é obrigatória' })
  @MaxLength(1000)
  descricao: string;
}
