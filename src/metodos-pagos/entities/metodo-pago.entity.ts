import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'metodos_pagos' })
export class MetodoPago {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50, unique: true })
  nombre: string;
}
