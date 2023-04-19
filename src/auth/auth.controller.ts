import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RefreshDTO } from './dto/refresh.dto'
import { RegisterDTO } from './dto/register.dto'
import { LoginDTO } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDTO) {
    return await this.authService.login(dto)
  }
  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return await this.authService.register(dto)
  }
  @Post('tokens')
  async getNewTokens(@Body() dto: RefreshDTO) {
    return await this.authService.getNewTokens(dto.refreshToken)
  }
}
