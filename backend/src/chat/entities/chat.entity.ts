import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE', cascade: true })
  sender: User;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE', cascade: true })
  receiver: User;

  @ManyToOne(() => Posts, (post) => post.room_id, {
    onDelete: 'CASCADE',
  })
  post: Posts;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar' })
  room_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_created: Date;
}
