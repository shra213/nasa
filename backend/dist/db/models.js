"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: String,
    email: String,
    photoURL: String,
    // 👇 yahan store honge friends ke ObjectId (User references)
    fav: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Experiment" }],
}, { timestamps: true });
const ExperimentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    authors: { type: String, required: true },
    year: { type: Number, required: true },
    mission: { type: String, required: true },
    experimentType: { type: String, required: true },
    organism: { type: String, required: true },
    summary: { type: String },
    publicationLink: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { versionKey: false });
const Experiment = mongoose_1.default.model("Experiment", ExperimentSchema);
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
