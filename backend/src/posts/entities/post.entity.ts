import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

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

    // @OneToMany(() => USERENTITY, (userRELATION) => userRELATION.id)
    // @JoinColumn()
    // user_id: USERENTITY;
 
    @Column({ primary: true, generated: true, select: false }) // ID de carro generado automáticamente y oculto al front (ejemplo: car_id: 100, luego 101)
    car_id: number;
    // @OneToOne(()=> CARENTITY, carRelation=>carRelation.id)
    // @JoinColumn()
    // car: CARENTITY;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

}

