import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    name: string;

}
