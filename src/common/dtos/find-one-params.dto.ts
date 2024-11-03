import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class FindOneParamsDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'El id es requerido' })
  @IsInt({ message: 'El id debe ser un número entero' })
  id: number;
}
