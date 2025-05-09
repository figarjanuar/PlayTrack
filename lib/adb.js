"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execPromise = void 0;
exports.adbConnect = adbConnect;
exports.adbPowerOn = adbPowerOn;
exports.adbPowerOff = adbPowerOff;
exports.adbSetSleepTimeout = adbSetSleepTimeout;
const util_1 = __importDefault(require("util"));
const child_process_1 = require("child_process");
exports.execPromise = util_1.default.promisify(child_process_1.exec);
async function adbConnect(ip) {
    await (0, exports.execPromise)(`adb connect ${ip}`);
}
async function adbPowerOn(ip) {
    await (0, exports.execPromise)(`adb -s ${ip}:5555 shell input keyevent 224`);
    await (0, exports.execPromise)(`adb -s ${ip}:5555 shell input keyevent 178`); // TV Input
    await (0, exports.execPromise)(`adb -s ${ip}:5555 shell input keyevent 23`); // DPAD_CENTER / ENTER
}
async function adbPowerOff(ip) {
    // await execPromise(`adb -s ${ip}:5555 shell input keyevent 223`);
    await (0, exports.execPromise)(`adb -s ${ip}:5555 shell input keyevent 3`); // KEYCODE_HOME
}
async function adbSetSleepTimeout(ip, durationMinutes) {
    const durationMs = durationMinutes * 60 * 1000;
    setTimeout(async () => {
        try {
            await (0, exports.execPromise)(`adb -s ${ip}:5555 shell input keyevent 223`);
            console.log(`TV at ${ip} powered off after ${durationMinutes} minutes`);
        }
        catch (error) {
            console.error(`Failed to power off TV at ${ip}:`, error);
        }
    }, durationMs);
}
