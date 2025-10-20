import { UserAccount } from '../models/UserAccount';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface JwtPayload {
    userId: number;
    role: UserAccount['role'];
    store_id?: number | null | undefined
}

export class AuthService {
    static async registerUser(
        display_name: string,
        email: string,
        password: string,
        phone: string,
        role: UserAccount['role'] = 'end_user',
        is_active: number
    ) {
        const existing = await UserAccount.findOne({ where: { email } });
        if (existing) throw new Error('Email already exists');

        const hash = await bcrypt.hash(password, 10);
        const user = await UserAccount.create({
            display_name,
            email,
            password_hash: hash,
            phone,
            role,
            is_active,
            uuid: ''
        });
        return user;
    }

    static async login(email: string, password: string) {
        const user = await UserAccount.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        if (!user.password_hash) {
            throw new Error('User has no password set');
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) throw new Error('Invalid password');

        if (!env.jwt.secret) throw new Error('JWT secret not defined');

        const payload: JwtPayload = { userId: user.id, role: user.role!, store_id:user.store_id };

        const token = await new Promise<string>((resolve, reject) => {
            const seconds = 7 * 24 * 60 * 60;
            jwt.sign(
                payload,
                env.jwt.secret as jwt.Secret,
                {
                    algorithm: 'HS256',
                    expiresIn: seconds,
                },
                (err, signedToken) => {
                    if (err || !signedToken) return reject(err);
                    resolve(signedToken);
                }
            );
        });

        return { user, token };
    }
    static async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await UserAccount.findByPk(userId);
        if (!user) throw new Error('User not found');

        if (!user.password_hash) {
            throw new Error('User has no password set');
        }

        const valid = await bcrypt.compare(oldPassword, user.password_hash);
        if (!valid) throw new Error('Old password incorrect');

        const hash = await bcrypt.hash(newPassword, 10);
        await user.update({ password_hash: hash });

        return true;
    }

}
