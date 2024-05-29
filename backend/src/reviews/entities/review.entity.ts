
import { Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "number", nullable: false })
    @Min(1)
    @Max(5)
    rating: number;
    
    @Column({ type: "text", nullable: false})
    comment: string;

    // @OneToMany(() => USERENTITY, (userRELATION) => userRELATION.id)
    // @JoinColumn()
    // user_id: USERENTITY;
 
    // @Column({ primary: true, generated: true, select: false }) // ID de carro generado automáticamente y oculto al front (ejemplo: car_id: 100, luego 101)
    // car_id: number;
    // // @OneToOne(()=> CARENTITY, carRelation=>carRelation.id)
    // // @JoinColumn()
    // // car: CARENTITY;

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

}

