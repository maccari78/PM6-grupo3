import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rentalStartDate: string;

  @Column()
  rentalEndDate: string;

  @Column()
  daysRemaining: number;

  @Column({ nullable: true })
  room_id: string;

  @ManyToMany(() => User, (user) => user.rentals, { eager: true })
  @JoinTable({
    name: 'user_rental',
    joinColumn: { name: 'rental_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @ManyToOne(() => Posts)
  @JoinColumn()
  posts: Posts;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Nueva columna para el costo total
  totalCost: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
