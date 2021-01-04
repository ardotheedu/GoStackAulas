import Appointment from '../infra/typeorm/entities/Appointments'
import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'

export default interface IAppointmentsRepository {
  create(date: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
