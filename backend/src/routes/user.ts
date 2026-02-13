import { Router } from "express";
import { getMe, getUser, deleteAccount, updateProfile } from "../controllers/user.contoller";
import { verifyToken } from "../middleware/user";

const router = Router();

router.route('/me').get(verifyToken, getMe);
router.route('/updateProfile').put(verifyToken, updateProfile);
router.route('/getUser').get(verifyToken, getUser);
router.route('/deleteAcc').delete(deleteAccount);
export default router;