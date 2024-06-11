import { Address } from 'src/addresses/entities/address.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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
    array: true,
    default: [
      'https://res.cloudinary.com/dkent00db/image/upload/f_auto,q_auto/v1/image%20car%20placeholder/fpm93xvjp26mpdde0ses',
    ],
  })
  image_url: string[];

  @Column({
    type: 'varchar',
    nullable: true,
    array: true,
  })
  public_id: string[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Timestamp;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Timestamp;

  @OneToOne(() => Posts)
  @JoinColumn()
  post: Posts;

  @ManyToOne(() => User, (user) => user.car)
  user: User;

  @OneToOne(() => Address, (address) => address.car)
  address: Address;
}
