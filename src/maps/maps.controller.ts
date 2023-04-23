import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Controller('file-upload')
  export class FileUploadController {
    @Post()
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
        fileFilter: (req, file, cb) => {
            console.log('da data',file.mimetype)
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
      // Process the uploaded GPX file
      return {
        status: 'success',
        message: 'File uploaded successfully',
        data: file,
      };
    }
  }
  