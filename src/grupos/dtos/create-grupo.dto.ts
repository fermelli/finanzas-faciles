import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TipoGrupo } from '../entities/grupo.entity';

export class CreateGrupoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'El tipo es requerido' })
  @IsEnum(TipoGrupo, {
    message: `El tipo debe ser uno de los siguientes valores: ${Object.values(TipoGrupo).join(', ')}`,
  })
  tipo: TipoGrupo;
}
