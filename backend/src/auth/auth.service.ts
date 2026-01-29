import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.adminUser.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email o contraseña incorrectos');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            data: {
                accessToken: token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            },
        };
    }

    async validateUser(userId: string) {
        const user = await this.prisma.adminUser.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        return user;
    }

    async createAdminUser(email: string, password: string, name?: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }
}
