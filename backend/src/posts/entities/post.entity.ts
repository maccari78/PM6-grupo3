import { Car } from "src/cars/entities/car.entity";
import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("posts")
export class Posts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type: "varchar", unique: true, nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;  

    //..........relations start........//
    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({  name: "userId"})
    user: User;
    
    //..........relations start........//
    @OneToOne(() => Car)
    @JoinColumn({ name: "carId" })
    car: Car; 

    //..........relations start........//
    @OneToMany(() => Review, reviews => reviews.post)
    review: Review[];
    
}

