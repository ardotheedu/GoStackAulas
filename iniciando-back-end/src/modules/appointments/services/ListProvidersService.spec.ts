import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakesUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    const user2 = await fakeUsersRepository.create({
        name: 'John Cena',
        email: 'johndoe@example.com',
        password: '1234567',
    });

    const loggedUser = await fakeUsersRepository.create({
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '1234567',
      });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2])
  });
});
