import { Module } from '@nestjs/common';
import { FileUploadController} from './maps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RouteSchema } from './schemas/route.schema';
import { RouteService } from './maps.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Route', schema: RouteSchema}])],
  controllers: [FileUploadController],
  providers: [RouteService],
})
export class MapsModule {}
