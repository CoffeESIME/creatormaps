import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema()
export class Route {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  origin: string;

  @Prop()
  dayCreated: string;
  
  @Prop()
  geoJSON:  mongoose.Schema.Types.Mixed;
}

export const RouteSchema = SchemaFactory.createForClass(Route);