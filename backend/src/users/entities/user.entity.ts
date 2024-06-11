import { Address } from 'src/addresses/entities/address.entity';
import { Car } from 'src/cars/entities/car.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'int', nullable: true })
  nDni: number;

  @Column({ nullable: true })
  rExpiration: string;

  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @Column({
    default:
      'https://res.cloudinary.com/dkent00db/image/upload/v1717555619/image%20profile%20picture%20placeholder/vqnmnefzjwscrtkfpxtw.webp',
  })
  image_url: string;

  @Column({
    nullable: true,
  })
  public_id: string;

  @Column({ default: false })
  userGoogle: boolean;

  @Column({ type: 'text', nullable: true })
  aboutMe: string;

  @Column({ default: 'user' })
  roles: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToMany(() => Rental, (rental) => rental.users)
  rentals: Rental[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  @JoinColumn()
  notifications: Notification[];

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  @JoinColumn()
  addresses: Address[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  //Para la tablar User desde Posts:
  @OneToMany(() => Posts, (post) => post.user)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  post: Posts[];

  @OneToMany(() => Car, (car) => car.user)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  car: Car;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
