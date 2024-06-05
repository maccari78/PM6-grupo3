import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => User, (user) => user.rentals)
  @JoinTable({
    name: 'user_rental',
    joinColumn: { name: 'rental_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @OneToOne(() => Posts)
  posts: Posts;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
