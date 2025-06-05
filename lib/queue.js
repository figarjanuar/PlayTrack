"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.powerOffQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../lib/redis");
const connection = (0, redis_1.createRedis)();
exports.powerOffQueue = new bullmq_1.Queue("powerOffTV", {
    connection,
});
