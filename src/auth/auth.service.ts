import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { LoginDTO } from './dto/login.dto'
import { RegisterDTO } from './dto/register.dto'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}
	async register(dto: RegisterDTO) {
		const isAlreadyRegistered = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})
		if (isAlreadyRegistered)
			throw new BadRequestException('user with this email is already in system')
		const user = await this.prisma.user.create({
			data: {
				...dto,
				//prettier-ignore
				role: "PLAYER",
				skinId: undefined,
				skin: undefined,
				berry: 0,
				password: await hash(dto.password),
			},
		})

		const tokens = await this.issueTokenPair(user.id)

		return { user, ...tokens }
	}
	async login(dto: LoginDTO) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(user.id)

		return { user, ...tokens }
	}

	private async validateUser(dto: LoginDTO) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})
		// must be placed right after
		if (!user) throw new NotFoundException('no user with this email registered')

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword) throw new UnauthorizedException('invalid password')

		return user
	}

	// initial tokens
	private async issueTokenPair(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })
		return { accessToken, refreshToken }
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verify(refreshToken)
		if (!result) throw new UnauthorizedException('invalid refresh token')

		const user = await this.prisma.user.findUnique({ where: { id: result.id } })

		const tokens = await this.issueTokenPair(user.id)

		return { user, ...tokens }
	}
}
