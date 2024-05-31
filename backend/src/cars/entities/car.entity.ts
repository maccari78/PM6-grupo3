import { Rental } from 'src/rentals/entities/rental.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar' })
  mileage: string;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @Column({
    type: 'varchar',
    default: [
      'https://res.cloudinary.com/dkent00db/image/upload/f_auto,q_auto/v1/image%20car%20placeholder/fpm93xvjp26mpdde0ses',
    ],
  })
  image_url: string[];

  @Column({
    type: 'varchar',
    default: null,
  })
  public_id: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  // USER ID --->

  @ManyToOne(() => User, (user) => user.car)
  user: User;
}
