import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: String,
    email: String,
    photoURL: String,

    // 👇 yahan store honge friends ke ObjectId (User references)

    fav : [{ type: mongoose.Schema.Types.ObjectId, ref: "Experiment" }],
}, { timestamps: true });


const ExperimentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        authors: { type: String, required: true },
        year: { type: Number, required: true },
        mission: { type: String, required: true },
        experimentType: { type: String, required: true },
        organism: { type: String, required: true },
        summary: { type: String },
        publicationLink: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

const Experiment = mongoose.model("Experiment", ExperimentSchema);
const User = mongoose.model("User", userSchema);

export { User };
