import { Module, forwardRef } from '@nestjs/common';
import { MapsModule } from './maps/maps.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [forwardRef(() => (MongooseModule.forRoot('mongodb://127.0.0.1:27017/db')))
    , MapsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
