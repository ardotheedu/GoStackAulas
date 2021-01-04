
import Appointment from '../entities/Appointments'
import {EntityRepository, Repository} from 'typeorm'
import IAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentRepository{

    public async findByDate(date: Date): Promise<Appointment | undefined> //-> não tiver um retorno essa parte depois do 2 pontos da erro
    {
        const findAppointment = await this.findOne({
            where: {date}, // -> date(que recebe): date(do appointment banco de dados)
        })
        return findAppointment; // -> Se encontrar retorne, se não retorne nulo
    }


}

export default AppointmentsRepository;
