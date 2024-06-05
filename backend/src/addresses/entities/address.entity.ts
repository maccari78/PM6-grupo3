import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'addresses',
})
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  zip_code: string;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    nullable: true,
  })
  longitude: number;

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Car, (car) => car.address)
  @JoinColumn()
  car: Car;
}
