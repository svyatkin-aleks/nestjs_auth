import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  count = 0;

  addCount(): string {
    this.count++;
    return 'Hello World!';
  }
  getCounter(): string {
    return this.count.toString();
  }
}
