import {isEqual} from 'date-fns'
import Appointment from '../models/Appointments'

interface CreateAppointmentDTO {
    provider: string,
    date: Date,
}

class AppointmentsRepository{
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }
    public all(): Appointment[] {
        return this.appointments;
    }
    public findByDate(date: Date): Appointment | null //-> não tiver um retorno essa parte depois do 2 pontos da erro 
    {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date)
        )
        return findAppointment || null; // -> Se encontrar retorne, se não retorne nulo
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({provider, date})

        this.appointments.push(appointment)

        return appointment;
    }
}

export default AppointmentsRepository;