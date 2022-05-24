import formidable from 'express-formidable';
import { RequestHandler } from 'express';
import path from 'path';
import makeDir from 'make-dir';


const fileDir = path.join(__dirname, '../../../../public/upload-file/');
makeDir(fileDir).then(()=>{},console.error);

export const formidableMiddleware: RequestHandler =formidable({
    encoding: 'utf-8',
    uploadDir: fileDir,
    multiples: true, // req.files to be arrays of files
  });
