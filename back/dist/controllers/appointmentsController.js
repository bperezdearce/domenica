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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = yield (0, appointmentsService_1.getAllAppointmentsService)();
        res.status(200).json(allAppointments);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
    ;
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = req.params;
    try {
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(Number(appointmentId));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
    ;
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, peopleNumber, userId } = req.body;
    try {
        const newAppointment = yield (0, appointmentsService_1.scheduleAppointmentService)({ date, time, peopleNumber, userId });
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
    ;
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointmentId } = req.params;
    try {
        yield (0, appointmentsService_1.cancelAppointmentService)(Number(appointmentId));
        res.status(200).json({ message: "Reserva cancelada" });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
    ;
});
exports.cancelAppointment = cancelAppointment;
