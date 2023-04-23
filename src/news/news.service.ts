import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { NewsDTO } from './dto/news.dto'

@Injectable()
export class NewsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.news.findMany()
	}
	async getById(id: string) {
		return await this.prisma.news.findFirst({ where: { id } })
	}
	async create(dto: NewsDTO) {
		return await this.prisma.news.create({
			data: {
				...dto,
			},
		})
	}
	async update(id: string, dto: NewsDTO) {
		return await this.prisma.news.update({
			where: { id: id },
			data: { title: dto.title, content: dto.content },
		})
	}
	async delete(id: string) {
		return await this.prisma.news.delete({ where: { id } })
	}
}
