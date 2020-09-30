import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDto from '../dtos/ICreateUserDto';
import IFindAllProvidersDto from '../dtos/IFindAllProvidersDto';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDto): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
