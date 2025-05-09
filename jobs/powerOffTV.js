"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.powerOffWorker = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const adb_1 = require("../lib/adb");
const mongodb_1 = require("../lib/mongodb");
const tv_1 = require("../models/tv");
const session_1 = require("../models/session");
const queue_1 = require("../lib/queue");
const connection = new ioredis_1.default({
    maxRetriesPerRequest: null,
});
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
        console.error(`❌ Error shutting down TV ${ip}:`, error);
    }
}, { connection });
