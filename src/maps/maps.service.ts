import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Route} from './interfaces/routes.interface'
@Injectable()
export class RouteService {
    constructor(@InjectModel('Route') private routeModel: Model<Route>) {}

    async getAllRoutes(): Promise<Route[]> {
        return await this.routeModel.find().exec()
    }

    async createRoute(data: any): Promise<Route> {
      const createdRoute = new this.routeModel(data);
      return await createdRoute.save();
    }

    async deleteRoute(routeId : string): Promise<Route> {
        const deletedRoute = await this.routeModel.findByIdAndDelete( routeId );
        return deletedRoute;
    }
}