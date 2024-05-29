import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, type: "varchar", unique: true, nullable: false })
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    // @OneToMany(() => USERENTITY, (userRELATION) => userRELATION.xd)
    // @JoinColumn()
    // user_id: USERENTITY[]

    // @OneToMany(() => CARENTITY, (carRELATION) => carRELATION.xd)
    // @JoinColumn()
    // car_id: CARENTITY[]

    // created_at: Date;
    // updated_at Date;

}

