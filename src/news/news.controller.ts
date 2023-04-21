import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { NewsDTO } from './dto/news.dto'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
	constructor(private readonly newsService: NewsService) {}

	@Get('/')
	getAll() {
		return this.newsService.getAll()
	}

	@Auth()
	@Post('new')
	create(@Body() dto: NewsDTO) {
		return this.newsService.create(dto)
	}

	@Auth()
	@Put('/e/:id')
	update(@Param('id') id: string, @Body() dto: NewsDTO) {
		return this.newsService.update(id, dto)
	}
	@Auth()
	@Delete('/d/:id')
	delete(@Param('id') id: string) {
		return this.newsService.delete(id)
	}
}
