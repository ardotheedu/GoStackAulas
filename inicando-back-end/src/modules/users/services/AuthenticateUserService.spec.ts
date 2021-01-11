import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to Authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });
    const response = await authenticateUser.execute({
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    expect(response).toHaveProperty('token');
    expect(user).toEqual(response.user);
  });
  it('should be able to Authenticate', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johnwwe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to Authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    await expect(
      authenticateUser.execute({
        email: 'johnwwe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
