import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRefreshToken } from './user_refresh_token';

@Entity("users")
export class User{
    @PrimaryGeneratedColumn("uuid")
    id!:string;
    @Column()
    name!:string
    @Column({unique:true})
    email!:string
    @Column()
    password!:string
    @CreateDateColumn()
    createdAt!:Date;
    @UpdateDateColumn()
    updatedAt!:Date;
    @OneToMany(()=>UserRefreshToken,(urf)=>urf.user)
    userRefreshToken!:UserRefreshToken[];
}