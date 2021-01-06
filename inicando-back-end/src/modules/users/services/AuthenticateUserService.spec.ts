import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

describe('AuthenticateUser', () => {
  it('should be able to Authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567'
    })
    const response = await authenticateUser.execute({
      email: 'johnwwe@example.com',
      password: '1234567'
    })

    expect(response).toHaveProperty('token')
    expect(user).toEqual(response.user)

  })
  it('should be able to Authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    expect(authenticateUser.execute({
      email: 'johnwwe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError)

  })
  it('should not be able to Authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUser.execute({
      name: 'John Cena',
      email: 'johnwwe@example.com',
      password: '1234567'
    })


    expect(authenticateUser.execute({
      email: 'johnwwe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)


  })
})
