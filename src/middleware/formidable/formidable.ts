import formidable from 'express-formidable';
import { RequestHandler } from 'express';


export const formidableMiddleware: RequestHandler =formidable({
    encoding: 'utf-8',
    uploadDir: '/upload-file/',
    multiples: true, // req.files to be arrays of files
  });
