import { Module } from '@nestjs/common';
import { MapsModule } from './maps/maps.module';
import { MapsdbService } from './mapsdb/mapsdb.service';


@Module({
  imports: [MapsModule],
  controllers: [],
  providers: [MapsdbService],
})
export class AppModule {}
