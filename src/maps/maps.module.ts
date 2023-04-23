import { Module } from '@nestjs/common';
import { FileUploadController} from './maps.controller';

@Module({
  controllers: [FileUploadController]
})
export class MapsModule {}
