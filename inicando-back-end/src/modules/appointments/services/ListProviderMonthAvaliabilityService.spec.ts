import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvaliabilityService;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository
    )
  });
  it('should be able to list the month avaliability ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    })

    const avaliability = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0)
    })

    expect(avaliability).toEqual(expect.arrayContaining([
      {day: 19, available: true},
      {day: 20, available: false},
      {day: 21, available: false},
      {day: 22, available: true},
    ]))
  });
});
