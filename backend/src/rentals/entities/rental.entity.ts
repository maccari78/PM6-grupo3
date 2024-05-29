import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Car } from '../../cars/entities/car.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  rentalStartDate: Date;

  @Column({ type: 'timestamp' })
  rentalEndDate: Date;

  @ManyToOne(() => User, user => user.rentals)
  user: User;

  @ManyToOne(() => Car, car => car.rentals)
  car: Car;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

