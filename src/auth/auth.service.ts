import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signup() {
        return 'this.authService.signup(dto);'
    }
    signin() {
        return 'this.authService.signin(dto);'
    }
}
