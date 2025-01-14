import { Router } from 'express';
import { getAllAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from "../controllers/appointmentsController";
import appointmentValidate from "../middlewares/appointmentValidate";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:appointmentId", getAppointmentById);
appointmentsRouter.post("/schedule", appointmentValidate, scheduleAppointment);
appointmentsRouter.put("/cancel/:appointmentId", cancelAppointment);

export default appointmentsRouter;