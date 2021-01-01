import {Request, Response} from 'express';
import createUser from './services/CreateUser'

export default function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'eduardosalima3@gmail.com',
        password: '123455',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native',
            {title: 'javascript', experience: 100}
        ]

    })
    return response.json({message: 'Hello World'})
}
