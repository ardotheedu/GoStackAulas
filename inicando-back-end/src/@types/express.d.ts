declare namespace Express {
    export interface Request {
        user: {
            id: string
            // -> vai adicionar o user ao Request do Express
        }
    }
}