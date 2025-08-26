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
exports.customerService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getAllCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.customer.findMany({
        select: {
            customerId: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
        },
    });
    return res;
});
const getSingleCustomer = (customId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.customer.findUniqueOrThrow({
        where: {
            customerId: customId,
        },
        select: {
            customerId: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
        },
    });
    return res;
});
const updateCustomer = (customId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.customer.update({
        where: { customerId: customId },
        data: payload,
        select: {
            customerId: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
        },
    });
    return res;
});
const deleteCustomer = (customId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.default.customer.delete({ where: { customerId: customId } });
    return res;
});
const createCustomer = (customerData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.create({
        data: customerData,
    });
    return result;
});
exports.customerService = {
    getAllCustomer,
    createCustomer,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
};
