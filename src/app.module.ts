import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [AuthModule, NewsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
