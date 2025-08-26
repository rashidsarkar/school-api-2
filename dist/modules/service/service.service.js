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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRecordService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.create({
        data: serviceData,
    });
    return result;
});
const getAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findMany({
        select: {
            serviceId: true,
            bikeId: true,
            serviceDate: true,
            completionDate: true,
            description: true,
            status: true,
        },
    });
    return result;
});
const getSingleService = (idx) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findUniqueOrThrow({
        where: {
            serviceId: idx,
        },
        select: {
            serviceId: true,
            bikeId: true,
            serviceDate: true,
            completionDate: true,
            description: true,
            status: true,
        },
    });
    return result;
});
const updateServiceStatus = (idx, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.update({
        where: {
            serviceId: idx,
        },
        data: {
            status: client_1.Status.done,
            completionDate: new Date(),
        },
        select: {
            serviceId: true,
            bikeId: true,
            serviceDate: true,
            completionDate: true,
            description: true,
            status: true,
        },
    });
    return result;
});
const serviceStatusData = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date(new Date().setUTCHours(0, 0, 0, 0));
    sevenDaysAgo.setUTCDate(sevenDaysAgo.getUTCDate() - 7);
    const res = yield prisma_1.default.serviceRecord.findMany({
        where: {
            status: { in: ["pending", "in_progress"] },
            serviceDate: { lt: sevenDaysAgo },
        },
        select: {
            serviceId: true,
            bikeId: true,
            serviceDate: true,
            completionDate: true,
            description: true,
            status: true,
        },
    });
    return res;
});
exports.serviceRecordService = {
    createService,
    getAllService,
    getSingleService,
    updateServiceStatus,
    serviceStatusData,
};
