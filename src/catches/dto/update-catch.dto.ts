import { PartialType } from '@nestjs/mapped-types';
import { CreateCatchDto } from './create-catch.dto';

export class UpdateCatchDto extends PartialType(CreateCatchDto) {}
