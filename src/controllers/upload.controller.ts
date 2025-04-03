import { BadRequestError } from '../utils/error';
import { NextFunction, Request, Response } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import multer from 'multer';

export class UploadController {
  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_KEY = process.env.SUPABASE_KEY;
      const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET;

      if (!SUPABASE_URL || !SUPABASE_KEY || !SUPABASE_BUCKET) {
        throw new BadRequestError(
          'Missing Supabase configuration in environment variables',
        );
      }

      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const bucket = SUPABASE_BUCKET;
      const file = req.file;
      const folder = req.body.folder;

      if (!folder || typeof folder !== 'string') {
        throw new BadRequestError('Folder must be a valid string');
      }

      if (!file) {
        throw new BadRequestError('File is required');
      }

      const filePath = `/${folder}/${Date.now()}_${file.originalname}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype || 'application/octet-stream',
        });

      if (error) {
        throw new BadRequestError(`Failed to upload file: ${error.message}`);
      }

      res.data({
        message: 'File uploaded successfully',
        url: `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
