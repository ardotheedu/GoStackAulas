import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository'

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}
type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    })

    return [{day: 1, available: false}];
  }
}

export default ListProviderMonthAvaliabilityService;