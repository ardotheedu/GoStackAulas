import Appointment from '../entities/Appointments'
import {getRepository, Repository, Raw} from 'typeorm'
import IAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class AppointmentsRepository implements IAppointmentRepository{
    private ormRepository: Repository<Appointment>;

    constructor() {
      this.ormRepository = getRepository(Appointment)
    }
    public async findByDate(date: Date): Promise<Appointment | undefined> //-> não tiver um retorno essa parte depois do 2 pontos da erro
    {
        const findAppointment = await this.ormRepository.findOne({
            where: {date}, // -> date(que recebe): date(do appointment banco de dados)
        })
        return findAppointment; // -> Se encontrar retorne, se não retorne nulo
    }

    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> //-> não tiver um retorno essa parte depois do 2 pontos da erro
    {
      const parsedMonth = String(month).padStart(2, '0')

      const appointments = await this.ormRepository.find({
        where: {
          provider_id,
          date: Raw(dateFieldName => `to_char(${dateFieldName}, MM-YYYY) = '${parsedMonth}-${year}'`)
        }
      })

      return appointments
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = this.ormRepository.create({provider_id, date})

      await this.ormRepository.save(appointment);

      return appointment
    }

}

export default AppointmentsRepository;
