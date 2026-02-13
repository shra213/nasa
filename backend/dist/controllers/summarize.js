"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarize = void 0;
// import { pipeline } from "@xenova/transformers";
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
// let summarizer: any = null;
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "facebook/bart-large-cnn";
async function extractTextFromFile(filePath) {
    if (filePath.endsWith(".pdf")) {
        const dataBuffer = fs_1.default.readFileSync(filePath);
        const pdfData = await (0, pdf_parse_1.default)(dataBuffer);
        console.log(pdfData.text);
        return pdfData.text;
    }
    else if (filePath.endsWith(".docx")) {
        const docxData = await mammoth_1.default.extractRawText({ path: filePath });
        console.log(docxData.value);
        return docxData.value;
    }
    else if (filePath.endsWith(".txt")) {
        return fs_1.default.readFileSync(filePath, "utf8");
    }
    else {
        throw new Error("Unsupported file type (only .pdf, .docx, .txt supported)");
    }
}
const summarize = async (req, res) => {
    const { filePath } = req.body || 'C:\Users\ASUS\Desktop\nasa\backend\nasa.txt';
    try {
        const text = await extractTextFromFile(filePath);
        const summary = await summ(text);
        res.json({ summary });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.summarize = summarize;
const summ = async (text) => {
    const response = await axios_1.default.post(`https://api-inference.huggingface.co/models/${HF_MODEL}`, { inputs: text }, { headers: { Authorization: `Bearer ${HF_API_KEY}` } });
};
// export const summarize = async (req: any, res: any) => {
//     try {
//         const { text } = req.body;
//         if (!text) return res.status(400).json({ error: "Text is required" });
//         const response = await axios.post(
//             `https://api-inference.huggingface.co/models/${HF_MODEL}`,
//             { inputs: text },
//             { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
//         );
//         res.json({ summary: response.data[0].summary_text });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Summarization failed" });
//     }
// };
