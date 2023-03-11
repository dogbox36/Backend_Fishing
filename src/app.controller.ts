import {
  Controller,
} from '@nestjs/common';
import { DataSource, EntityNotFoundError } from 'typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

}
