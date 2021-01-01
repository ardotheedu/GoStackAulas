import { Router } from 'express';
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticate'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    try {
        const {name, email, password} = request.body;
        const createUser = new CreateUserService()
        const user = await createUser.execute({
            name,
            email,
            password
        })

        return response.json(user)
    } catch (err) {
        return response.status(400).json({error: err.message})
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), 
async (request, response) => {

        const updateUserAvatar = new UpdateUserAvatarService()

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,

        })
        const userWhitoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar
        }
        return response.json(userWhitoutPassword)

})
export default usersRouter