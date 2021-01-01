
import Appointment from '../models/Appointments'
import {EntityRepository, Repository} from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

    public async findByDate(date: Date): Promise<Appointment | null> //-> não tiver um retorno essa parte depois do 2 pontos da erro 
    {
        const findAppointment = await this.findOne({
            where: {date: date}, // -> date(que recebe): date(do appointment banco de dados)
        })
        return findAppointment || null; // -> Se encontrar retorne, se não retorne nulo
    }


}

export default AppointmentsRepository;