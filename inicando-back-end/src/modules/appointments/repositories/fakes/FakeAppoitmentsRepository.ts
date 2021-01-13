import {v4 as uuid} from 'uuid'
import {isEqual, getMonth, getYear} from 'date-fns'
import Appointment from '../../infra/typeorm/entities/Appointments'
import IAppointmentRepository from '@modules/appointments/repositories/iAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/iCreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentRepository{
    private appointments: Appointment[] = []
    public async findByDate(date: Date): Promise<Appointment | undefined> //-> não tiver um retorno essa parte depois do 2 pontos da erro
    {
      const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date),)

      return findAppointment
    }

    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> //-> não tiver um retorno essa parte depois do 2 pontos da erro
    {
      const appointments = this.appointments.filter(appointment => {
        return (
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date)  === year
        )
      })

      return appointments
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = new Appointment();

      Object.assign(appointment, {id: uuid(), date, provider_id})

      this.appointments.push(appointment)

      return appointment
    }
}

export default FakeAppointmentsRepository;
