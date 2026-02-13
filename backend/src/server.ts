import app from './app';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
import connectDB from './db/db';
const PORT = process.env.PORT || 8000;
const HF_API_KEY = process.env.HF_API_KEY;

// export const summarizeText = async (text: string) => {
//     try {
//         const response = await axios.post(
//             "https://api-inference.huggingface.co/pipeline/summarization",
//             {
//                 inputs: text,
//                 parameters: { max_length: 60, min_length: 20, do_sample: false },
//             },
//             { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
//         );

//         console.log("Full response:", response.data);
//         return response.data[0]?.summary_text || "No summary generated";
//     } catch (err: any) {
//         console.error("Error summarizing text:", err.response?.data || err.message);
//         return null;
//     }
// };

// (async () => {
//     const summary = await summarizeText(
//         "Hello, I am Shraddha. We are TYIT students from KKWIEER Nashik, and we are web developers who build responsive, user-friendly designs."
//     );,
//     console.log("Summary:", summary);
// })();

connectDB().then(async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Server initialization done, waiting for requests...");
    });
}).catch((e) => {
    console.log(e);
})


// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

