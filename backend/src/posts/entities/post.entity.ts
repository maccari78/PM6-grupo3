import { Car } from 'src/cars/entities/car.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Chat, (chat) => chat.post)
  room_id: Chat[];

  //..........relations start........//
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'userId' })
  user: User;

  //..........relations start........//
  @OneToOne(() => Car, { cascade: true })
  @JoinColumn({ name: 'carId' })
  car: Car;

  @OneToMany(() => Rental, (rental) => rental.posts)
  rentals: Rental[];
<<<<<<< HEAD
  
=======

>>>>>>> 52ef47685fdc7f74a530cdcb3a351127a176443b
  // @OneToMany(() => Review, (review) => review.post)
  // review: Review[];

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
<<<<<<< HEAD
  
  //..........relations start........//
  @OneToMany(() => Review, (reviews) => reviews.post,{ cascade: true })
  review: Review[];
=======
>>>>>>> 52ef47685fdc7f74a530cdcb3a351127a176443b

  //..........relations start........//
  @OneToMany(() => Review, (review) => review.post, { cascade: true })
  review: Review[];
}
