import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['PENDENTE', 'CONCLUIDA'])
  status: 'PENDENTE' | 'CONCLUIDA';
}
