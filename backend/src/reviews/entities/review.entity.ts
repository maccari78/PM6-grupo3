import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  //..........relations start........//
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  //Para la tablar user desde Review:
  // @OneToMany(() => Review, review => review.user)
  // reviews: Review[];
  //..........relations end........//

  //..........relations start ........//
  // @OneToOne(()=> Car, car=>car.id)
  // @JoinColumn({ name: "carId" })
  // car: Car;

  //Para la tablar Car desde Review:
  // @OneToOne(() => Review, review => review.car)
  // reviews: Review[];
  //..........relations end........//

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
