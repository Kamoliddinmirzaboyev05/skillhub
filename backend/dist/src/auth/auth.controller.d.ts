import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    refresh(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: any;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
    getProfile(req: any): any;
    getAdminData(): {
        message: string;
    };
}
