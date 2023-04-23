import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DOMParser } from 'xmldom';
import * as togeojson from '@mapbox/togeojson';
import { promises as fs } from 'fs';
import { RouteService } from './maps.service';

@Controller('route')
export class FileUploadController {
  constructor(private readonly routeService: RouteService) { }
  @Get()
  async getAllRoutes() {
    const routes = await this.routeService.getAllRoutes()
    return routes;
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },

      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/octet-stream') {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    const gpxFileContent = await fs.readFile(file.path, 'utf-8');
    const geoJSON = this.gpxToGeoJSON(gpxFileContent);
    // Process the uploaded GPX file
    const routeData = {
      name: file.originalname, // Get the route name
      author: 'Fabian Romero', // Get the author name
      origin: 'Wikiloc', // Get the origin name (Wikiloc, etc.)
      dayCreated: new Date(), // Get the date of creation
      geoJSON: geoJSON,
    };
    const createdRoute = await this.routeService.createRoute(routeData);


    return {
      status: 'success',
      message: 'File uploaded successfully',
      data: createdRoute,
    };
  }

  private gpxToGeoJSON(gpxFileContent: string): object {
    const parser = new DOMParser();
    const gpxDOM = parser.parseFromString(gpxFileContent, 'application/xml');
    const geoJSON = togeojson.gpx(gpxDOM);
    return geoJSON;
  }
}
