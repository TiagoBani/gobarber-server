import { Router } from 'express';
import { uuid } from 'uuidv4';
import { isEqual, parseISO, startOfDay } from 'date-fns';

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfDay(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }
  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  response.status(201).json(appointments);
});

export default appointmentsRouter;
