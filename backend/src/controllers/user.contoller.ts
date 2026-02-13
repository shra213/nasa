import { User } from "../db/models";
import { admin } from "../db";
// ✅ Get current logged-in user
export const getMe = async (req: any, res: any) => {
    try {
        console.log("welcome")
        const user = await User.findOne({ uid: req.user.uid }); // Firebase UID se search
        console.log(user, "use");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err: any) {
        console.error("Error fetching current user:", err.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ✅ Get user by ID (Mongo ObjectId or Firebase UID)
export const getUser = async (req: any, res: any) => {
    const userId = req.body.id;

    if (!userId) {
        return res.status(400).json({ msg: "User ID not provided" });
    }

    try {
        let user = await User.findById(userId); // Mongo ObjectId se
        if (!user) {
            // Agar byId fail ho to uid ke through try karo (Firebase UID)
            user = await User.findOne({ uid: userId });
        }

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json(user);
    } catch (e: any) {
        console.error("Error fetching user:", e.message);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// ✅ Update Profile
export const updateProfile = async (req: any, res: any) => {
    const { name, profile, birthdate, mediaUrl, publicId } = req.body;

    if (!name && !profile && !birthdate && !mediaUrl && !publicId) {
        return res.status(400).json({ error: "No valid input provided" });
    }

    try {
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (profile !== undefined) updateData.profile = profile;
        if (birthdate !== undefined) updateData.birthdate = birthdate;
        if (mediaUrl !== undefined) updateData.mediaUrl = mediaUrl;
        if (publicId !== undefined) updateData.publicId = publicId;

        const user = await User.findOneAndUpdate(
            { uid: req.user.uid }, // Firebase UID se identify karna
            { $set: updateData },
            { new: true } // updated user return kare
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "Profile updated successfully",
            updated: user,
        });
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Delete Account
export const deleteAccount = async (req: any, res: any) => {
    try {
        const userId = req.body.id || req.user.uid;

     
        const user = await User.findOneAndDelete({ uid: userId });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        await admin.auth().deleteUser(userId);

        return res.status(200).json({ msg: "Account deleted successfully" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ msg: "Error deleting account" });
    }
};
