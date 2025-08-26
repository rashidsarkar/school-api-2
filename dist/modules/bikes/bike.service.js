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
exports.bikeService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getAllBikes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findMany({
        select: {
            bikeId: true,
            brand: true,
            model: true,
            year: true,
            customerId: true,
        },
    });
    return result;
});
const createBikes = (bikeData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.create({
        data: bikeData,
    });
    return result;
});
const getSingleBike = (bikeIdx) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findUniqueOrThrow({
        where: {
            bikeId: bikeIdx,
        },
        select: {
            bikeId: true,
            brand: true,
            model: true,
            year: true,
            customerId: true,
        },
    });
    return result;
});
exports.bikeService = {
    createBikes,
    getAllBikes,
    getSingleBike,
};
