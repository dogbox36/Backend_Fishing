import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsersRepository() {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
