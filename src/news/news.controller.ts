import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { NewsDTO } from './dto/news.dto'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get('/')
	getAll() {
		return this.newsService.getAll()
	}
	@Post('new')
	create(@Body() dto: NewsDTO) {
		return this.newsService.create(dto)
	}
	@Put('/e/:id')
	update(@Param('id') id: string, @Body() dto: NewsDTO) {
		return this.newsService.update(id, dto)
	}
	@Delete('/d/:id')
	delete(@Param('id') id: string) {
		return this.newsService.delete(id)
	}
}
