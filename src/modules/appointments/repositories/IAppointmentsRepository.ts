import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
