import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum TipoGrupo {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
}

@Entity({ name: 'grupos' })
export class Grupo {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ name: 'tipo', type: 'enum', enum: TipoGrupo })
  tipo: TipoGrupo;
}
