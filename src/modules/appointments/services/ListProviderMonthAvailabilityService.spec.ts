import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month month availability provider', async () => {
    const hoursAvailability = Array.from({ length: 10 }, (_, i) => 8 + i);

    const promisesAppointments = hoursAvailability.map(hour =>
      fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, hour),
      }),
    );

    await Promise.all(promisesAppointments);

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, availability: true },
        { day: 20, availability: false },
        { day: 21, availability: true },
        { day: 22, availability: true },
      ]),
    );
  });
});
