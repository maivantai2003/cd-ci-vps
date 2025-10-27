import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity("user_refresh_tokens")
export class UserRefreshToken {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    @Column()
    refreshToken!: string;
    @Column({type: "timestamp"})
    expiresAt!: Date;
    @ManyToOne(() => User, (user) => user.userRefreshToken, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user:User
}