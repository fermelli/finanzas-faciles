import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMetodoPagoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MaxLength(50, { message: 'El nombre no debe tener mas de 50 caracteres' })
  nombre: string;
}

// QUESTION: La entidad al tener un solo campo, ya no es necesario un update dto?
