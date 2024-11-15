import { Grupo } from 'src/grupos/entities/grupo.entity';
import { MetodoPago } from 'src/metodos-pagos/entities/metodo-pago.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transacciones' })
export class Transaccion {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'grupo_id', type: 'int', unsigned: true })
  grupoId: number;

  @Column({ name: 'metodo_pago_id', type: 'int', unsigned: true })
  metodoPagoId: number;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'hora', type: 'time' })
  hora: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 1000 })
  descripcion: string;

  @Column({ name: 'monto_total', type: 'decimal', precision: 10, scale: 2 })
  montoTotal: number;

  @CreateDateColumn({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creadoEn: Date;

  @UpdateDateColumn({
    name: 'actualizado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  actualizadoEn: Date;

  @ManyToOne(() => Grupo, (grupo) => grupo.transacciones)
  @JoinColumn({ name: 'grupo_id', referencedColumnName: 'id' })
  grupo: Grupo;

  @ManyToOne(() => MetodoPago, (metodoPago) => metodoPago.transacciones)
  @JoinColumn({ name: 'metodo_pago_id', referencedColumnName: 'id' })
  metodoPago: MetodoPago;
}
