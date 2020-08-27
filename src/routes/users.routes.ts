import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import configUpload from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(configUpload);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await CreateUserService.execute({ name, email, password });

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.user;
    const { filename } = request.file;
    const user = await UpdateUserAvatarService.execute({
      user_id: id,
      avatarFileName: filename,
    });

    return response.json({ user });
  },
);

export default usersRouter;
