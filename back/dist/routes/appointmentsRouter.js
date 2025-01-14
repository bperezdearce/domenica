"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const appointmentValidate_1 = __importDefault(require("../middlewares/appointmentValidate"));
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", appointmentsController_1.getAllAppointments);
appointmentsRouter.get("/:appointmentId", appointmentsController_1.getAppointmentById);
appointmentsRouter.post("/schedule", appointmentValidate_1.default, appointmentsController_1.scheduleAppointment);
appointmentsRouter.put("/cancel/:appointmentId", appointmentsController_1.cancelAppointment);
exports.default = appointmentsRouter;
