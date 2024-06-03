import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
