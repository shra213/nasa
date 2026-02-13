// import { pipeline } from "@xenova/transformers";
import axios from "axios";
import fs from "fs";
const pdfParse = require("pdf-parse");
import mammoth from "mammoth";
// let summarizer: any = null;
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "facebook/bart-large-cnn";

async function extractTextFromFile(filePath: string): Promise<string> {
    if (filePath.endsWith(".pdf")) {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        console.log(pdfData.text);
        return pdfData.text;
    } else if (filePath.endsWith(".docx")) {
        const docxData = await mammoth.extractRawText({ path: filePath });
        console.log(docxData.value);
        return docxData.value;
    } else if (filePath.endsWith(".txt")) {
        console.log("txt file");
        return fs.readFileSync(filePath, "utf8");
    } else {
        throw new Error("Unsupported file type (only .pdf, .docx, .txt supported)");
    }
}

export const summarize = async (req: any, res: any) => {
    const filePath: string =
        req.body?.filePath ? req.body.filePath : "C:\\Users\\ASUS\\Desktop\\nasa\\backend\\nasa.txt";
    const text = req.body?.text || undefined;
    console.log(filePath);
    try {
        if (!filePath) {
            const text = await extractTextFromFile(filePath);
        }
        // console.log(text);
        const summary = await summ(text);
        console.log(summary);
        res.json({ summary });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
}

const summ = async (text: string) => {
    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        { inputs: text },
        { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );
    return response.data[0].summary_text
}

