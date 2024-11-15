import { Transaccion } from 'src/transacciones/entities/transaccion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'metodos_pagos' })
export class MetodoPago {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true })
  nombre: string;

  @OneToMany(() => Transaccion, (transaccion) => transaccion.metodoPago)
  transacciones: Transaccion[];
}
