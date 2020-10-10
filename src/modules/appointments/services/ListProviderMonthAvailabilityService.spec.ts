import { addDays, getYear, getMonth, subDays } from 'date-fns';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability provider', async () => {
    const hoursAvailability = Array.from({ length: 10 }, (_, i) => 8 + i);

    const today = new Date();
    const tomorrow = addDays(new Date(), 1);
    const yesterday = subDays(new Date(), 1);

    const promisesAppointments = hoursAvailability.map(hour => {
      today.setHours(hour);
      return fakeAppointmentsRepository.create({
        provider_id: 'user',
        user_id: 'user_id',
        date: today,
      });
    });

    await Promise.all(promisesAppointments);

    const date2 = addDays(new Date(), 2);
    date2.setHours(8);

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user_id',
      date: date2,
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: getMonth(today) + 1,
      year: getYear(today),
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: yesterday.getDate(), available: false },
        { day: today.getDate(), available: false },
        { day: tomorrow.getDate(), available: true },
        { day: date2.getDate(), available: true },
      ]),
    );
  });
});
