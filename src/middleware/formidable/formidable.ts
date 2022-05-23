import formidable from 'express-formidable';
import { RequestHandler } from 'express';
import path from 'path';

const fileDir = path.join(__dirname, '../../../upload-file/');


export const formidableMiddleware: RequestHandler =formidable({
    encoding: 'utf-8',
    uploadDir: fileDir,
    multiples: true, // req.files to be arrays of files
  });
