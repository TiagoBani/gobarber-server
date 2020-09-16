import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import configUpload from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { container } from 'tsyringe';

const usersRouter = Router();
const upload = multer(configUpload);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });

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

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      user_id: id,
      avatarFileName: filename,
    });

    return response.json({ user });
  },
);

export default usersRouter;
