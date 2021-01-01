import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';


const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
        const {email, password} = request.body

        const authenticateUser = new AuthenticateUserService()

        const {user, token} = await authenticateUser.execute({
            email,
            password

        })
        
        return response.json({user, token})
   
})
export default sessionsRouter