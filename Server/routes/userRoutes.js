import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
import { requireAuth } from '@clerk/express';
const router = express.Router();


router.get('/user',requireAuth(), getUserData);
router.post('/apply',requireAuth(), applyForJob)
router.get('/applications',requireAuth(), getUserJobApplications)
router.post('/update-resume',requireAuth(),  upload.single("resumeFile"), updateUserResume)
export default router;