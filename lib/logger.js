"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = logError;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LOG_DIR = path_1.default.join(process.cwd(), 'logs');
const ERROR_FILE = path_1.default.join(LOG_DIR, 'error.log');
function logError(message, data) {
    try {
        if (!fs_1.default.existsSync(LOG_DIR)) {
            fs_1.default.mkdirSync(LOG_DIR);
        }
        const entry = {
            time: new Date().toISOString(),
            message,
            data,
        };
        fs_1.default.appendFileSync(ERROR_FILE, JSON.stringify(entry) + '\n');
        if (process.env.NODE_ENV !== 'production') {
            console.error(message, data);
        }
    }
    catch (err) {
        console.error('Failed to write error log', err);
    }
}
