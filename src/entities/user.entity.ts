import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import * as argon2 from "argon2";
import { Watchlist } from "./watchlist.entity.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", unique: true })
    username!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;

    @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
    watchlists!: Watchlist[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    async verifyPassword(password: string) {
        return await argon2.verify(this.password, password);
    }
}
