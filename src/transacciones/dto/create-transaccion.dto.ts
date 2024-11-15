import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransaccionDto {
  @Type(() => Number)
  @IsNotEmpty({ message: 'El grupo es requerido' })
  @IsInt({ message: 'El grupo debe ser un entero' })
  grupoId: number;

  @Type(() => Number)
  @IsNotEmpty({ message: 'El metodo de pago es requerido' })
  @IsInt({ message: 'El metodo de pago debe ser un entero' })
  metodoPagoId: number;

  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha es requerida' })
  @IsDate({ message: 'La fecha debe ser una fecha valida' })
  fecha: Date;

  @IsNotEmpty({ message: 'La hora es requerida' })
  // TODO: Validar formato de hora valido (HH:MM:SS) con decorador personalizado
  hora: string;

  @IsNotEmpty({ message: 'La descripcion es requerida' })
  @IsString({ message: 'La descripcion debe ser un texto' })
  @MaxLength(1000, {
    message: 'La descripcion no puede ser mayor a 1000 caracteres',
  })
  descripcion: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'El monto total es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto total debe ser un numero con maximo 2 decimales' },
  )
  montoTotal: number;
}
