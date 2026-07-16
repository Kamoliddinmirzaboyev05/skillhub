import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    private generateTokens;
}
