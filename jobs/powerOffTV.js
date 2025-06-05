"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.powerOffWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../lib/redis");
const adb_1 = require("../lib/adb");
const mongodb_1 = require("../lib/mongodb");
const tv_1 = require("../models/tv");
const session_1 = require("../models/session");
const queue_1 = require("../lib/queue");
const logger_1 = require("../lib/logger");
const connection = (0, redis_1.createRedis)();
exports.powerOffWorker = new bullmq_1.Worker("powerOffTV", async (job) => {
    const { tvId, ip, sessionId } = job.data;
    console.log(`🔌 Powering off TV ${ip}...`);
    try {
        await queue_1.powerOffQueue.remove(tvId);
        await (0, mongodb_1.connectDB)();
        await (0, adb_1.adbPowerOff)(ip);
        await session_1.Session.findByIdAndUpdate(sessionId, {
            status: "Ended",
        }).exec();
        ;
        await tv_1.TV.findByIdAndUpdate(tvId, {
            status: "Idle",
            currentSessionId: null,
        }).exec();
        ;
        console.log(`✅ TV ${ip} powered off, status updated`);
    }
    catch (error) {
        (0, logger_1.logError)(`Error shutting down TV ${ip}`, error);
    }
}, { connection });
