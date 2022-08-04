import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.addCount();
  }

  @Get('/counter')
  getCounter(): string {
    return this.appService.getCounter();
  }
}
