import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to create a new user', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'John cena',
      email: 'johnwwe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johnwwe@example.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johnwwe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John cena',
      email: 'johnwwe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johnwwe@example.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
