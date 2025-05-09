"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    tv: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TV", required: true },
    tvName: { type: String, required: true },
    tvIpAddress: { type: String, required: true },
    psType: { type: String, required: true },
    startTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Ended"], default: "Active" },
    fee: { type: Number, required: true },
}, { timestamps: true });
exports.Session = mongoose_1.default.models.Session || mongoose_1.default.model("Session", sessionSchema);
