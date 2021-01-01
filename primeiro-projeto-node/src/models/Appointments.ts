import {v4 as uuid} from 'uuid'

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor({provider, date}: Omit<Appointment, 'id'>) {
        // O omit vai pegar os dados acima, menos o id que vai ser criado
        // estaticamente dentro do constructor, pelo constructor, diferente dos outros dois
        this.id = uuid()
        this.provider = provider
        this.date = date
    }
}

export default Appointment;