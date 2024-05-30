import { Car } from "src/cars/entities/car.entity";
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

    //..........relations start........//
    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({ name: "userId"})
    user: User;

    //Para la tablar User desde Posts:
    //@OneToMany(() => Posts, (post) => post.user)
    //@JoinColumn({ name: "userId", referencedColumnName: "id" })
    //post: Posts[];
    //..........relations end........//
 
    //..........relations start........//
    @OneToOne(() => Car)
    @JoinColumn({ name: "carId" })
    car: Car;

    // @OneToOne(() => Car, (car) => car.post)
    // @JoinColumn({ name: "carId" })
    // car: Car;

    //Para la tablar Car desde Posts:
    //@OneToOne(() => Posts, (post) => post.car)
    //@JoinColumn({ name: "carId", referencedColumnName: "id" })
    //post: Posts[];
    //..........relations end........//

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

}

