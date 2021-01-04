import path from 'path'
import fs from 'fs'

import uploadConfig from '@config/upload'
import User from '../infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository';


interface Request {
    user_id: string,
    avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

    public async execute({user_id, avatarFilename}: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Only authenticated users can change avatar.', 401)
        }

        if (user.avatar) {
            //Deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
            // stat tras o estado do arquivo, porem apenas se ele existir
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }
        user.avatar = avatarFilename

        await this.usersRepository.save(user)
        // => atualizar a foto do avatar e salvar
        return user
    }
}

export default UpdateUserAvatarService;
