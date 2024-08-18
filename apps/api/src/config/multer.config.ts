import { AuthRequest } from '@api/modules/auth/auth.guard';
import { BadRequestException } from '@nestjs/common';
import * as multer from 'multer';

export const profilePictureStorage = multer.diskStorage({
  destination: './uploads',
  filename: (req: AuthRequest, file, cb) => {
    if (file == null || file == undefined) {
      throw new BadRequestException('Provide a file');
    }
    const extension = file.mimetype.split('/')[1];
    const filename = `${req.user.username}.${extension}`;
    cb(null, filename);
  },
});
