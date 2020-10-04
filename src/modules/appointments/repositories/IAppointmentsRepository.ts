import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import IFindAllInDayFromProviderDto from '../dtos/IFindAllInDayFromProviderDto';
import IFindAllInMonthFromProviderDto from '../dtos/IFindAllInMonthFromProviderDto';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDto,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDto,
  ): Promise<Appointment[]>;
}
