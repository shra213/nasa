"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateProfile = exports.getUser = exports.getMe = void 0;
const models_1 = require("../db/models");
const db_1 = require("../db");
// ✅ Get current logged-in user
const getMe = async (req, res) => {
    try {
        console.log("welcome");
        const user = await models_1.User.findOne({ uid: req.user.uid }); // Firebase UID se search
        console.log(user, "use");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching current user:", err.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.getMe = getMe;
// ✅ Get user by ID (Mongo ObjectId or Firebase UID)
const getUser = async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({ msg: "User ID not provided" });
    }
    try {
        let user = await models_1.User.findById(userId); // Mongo ObjectId se
        if (!user) {
            // Agar byId fail ho to uid ke through try karo (Firebase UID)
            user = await models_1.User.findOne({ uid: userId });
        }
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (e) {
        console.error("Error fetching user:", e.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};
exports.getUser = getUser;
// ✅ Update Profile
const updateProfile = async (req, res) => {
    const { name, profile, birthdate, mediaUrl, publicId } = req.body;
    if (!name && !profile && !birthdate && !mediaUrl && !publicId) {
        return res.status(400).json({ error: "No valid input provided" });
    }
    try {
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (profile !== undefined)
            updateData.profile = profile;
        if (birthdate !== undefined)
            updateData.birthdate = birthdate;
        if (mediaUrl !== undefined)
            updateData.mediaUrl = mediaUrl;
        if (publicId !== undefined)
            updateData.publicId = publicId;
        const user = await models_1.User.findOneAndUpdate({ uid: req.user.uid }, // Firebase UID se identify karna
        { $set: updateData }, { new: true } // updated user return kare
        );
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({
            msg: "Profile updated successfully",
            updated: user,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
// ✅ Delete Account
const deleteAccount = async (req, res) => {
    try {
        const userId = req.body.id || req.user.uid;
        const user = await models_1.User.findOneAndDelete({ uid: userId });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        await db_1.admin.auth().deleteUser(userId);
        return res.status(200).json({ msg: "Account deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error deleting account" });
    }
};
exports.deleteAccount = deleteAccount;
