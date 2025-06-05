"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedis = createRedis;
const ioredis_1 = __importDefault(require("ioredis"));
function createRedis() {
    const url = process.env.REDIS_URL;
    if (url) {
        return new ioredis_1.default(url, { maxRetriesPerRequest: null });
    }
    return new ioredis_1.default({ maxRetriesPerRequest: null });
}
