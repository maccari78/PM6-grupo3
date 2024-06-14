import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rentalPrev')
export class RentalPrev {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userEmail: string;

  @Column({ nullable: false })
  postId: string;

  @Column({ nullable: false })
  startDate: string;

  @Column({ nullable: false })
  endDate: string;

  @Column({ nullable: false })
  totalCost: number;

  @Column({ nullable: false })
  daysRemaining: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
