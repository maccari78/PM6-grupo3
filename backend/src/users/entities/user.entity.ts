import { Rental } from 'src/rentals/entities/rental.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  public_id: string;

  @OneToMany(() => Rental, rental => rental.user)
  rentals: Rental[];
  
  // @OneToMany(() => Notifications, (notification) => notification.user)
  // @JoinColumm()
  // notifications: Notification[];

  // @OneToMany(() => Addresses, (address) => address.user)
  // @JoinColumn()
  // addresses: Address[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

