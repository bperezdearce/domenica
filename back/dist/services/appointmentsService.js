"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const repositories_1 = require("../repositories");
const IAppointment_1 = require("../interfaces/IAppointment");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield repositories_1.appointmentRepository.find();
    return allAppointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentRepository.findOneBy({ id: appointmentId });
    if (!appointment)
        throw Error("Reserva no encontrada");
    return appointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (IAppointmentsDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, peopleNumber, userId } = IAppointmentsDto;
    const user = yield repositories_1.userRepository.findOneBy({ id: userId });
    if (!user)
        throw Error("Usuario no encontrado");
    const newAppointment = repositories_1.appointmentRepository.create({
        date,
        time,
        peopleNumber,
    });
    newAppointment.user = user;
    yield repositories_1.appointmentRepository.save(newAppointment);
    return newAppointment;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield repositories_1.appointmentRepository.findOneBy({ id: appointmentId });
    if (!appointment)
        throw Error("Reserva no encontrada");
    appointment.status = IAppointment_1.AppointmentStatus.CANCELLED;
    yield repositories_1.appointmentRepository.save(appointment);
    return;
});
exports.cancelAppointmentService = cancelAppointmentService;
