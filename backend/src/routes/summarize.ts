import { Router } from 'express';
import { summarize } from '../controllers/summarize';
const router = Router();

router.route('/summarize').post(summarize);

export default router;