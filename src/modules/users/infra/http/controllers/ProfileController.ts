import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfile = container.resolve(UpdateUserProfileService);
      const user = await updateProfile.execute({
        user_id,
        email,
        name,
        password,
        old_password,
      });

      return response.status(201).json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
