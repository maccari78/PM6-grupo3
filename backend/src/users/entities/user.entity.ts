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

  @Column()
  password: string;

  @Column({
    default:
      'https://res-console.cloudinary.com/dkent00db/thumbnails/v1/image/upload/v1717035367/aWNvbi03Nzk3NzA0XzY0MF9mb2ZjOGk=/drilldown',
  })
  image_url: string;

  @Column({
    default: null,
  })
  public_id: string;

  @ManyToMany(() => Rental, (rental) => rental.users)
  rentals: Rental[];

  @OneToMany(() => Notification, (notification) => notification.user)
  @JoinColumn()
  notifications: Notification[];

  @OneToMany(() => Address, (address) => address.user)
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
