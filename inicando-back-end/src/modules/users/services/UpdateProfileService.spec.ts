import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'Johntre@gmail.com',
    });
    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('Johntre@gmail.com');
  });
  it('should not be able to change email to another that already exists in the database', async () => {
    await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'Johntre@gmail.com',
      password: '1234567',
    });
    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Cena',
        email: 'johnwwe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'Johntre@gmail.com',
      old_password: '1234567',
      password: '123123',
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'Johntre@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'Johntre@gmail.com',
        old_password: '098765',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
