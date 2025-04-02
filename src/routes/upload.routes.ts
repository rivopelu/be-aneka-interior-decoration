import multer from 'multer';
import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();
const controller = new UploadController();

router.post('/v1/upload', upload.single('file'), controller.upload);

export const uploadRoutes = router;
