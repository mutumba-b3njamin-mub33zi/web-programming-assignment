import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getMyApplications,
  getApplicationById,
  applyForJob,
  updateApplicationStatus,
  sendMessage,
  getMessages,
  getApplicationStats,
  upload
} from '../controllers/application.controller.js';
import multer from 'multer';

const router = express.Router();

// Get user's applications with filtering and pagination
router.get('/me', auth, getMyApplications);

// Get application statistics
router.get('/stats', auth, getApplicationStats);

// Get specific application
router.get('/:id', auth, getApplicationById);

// Apply for a job with resume upload
router.post('/jobs/:jobId/apply', auth, upload, applyForJob);

// Update application status (employer only)
router.put('/:id/status', auth, updateApplicationStatus);

// Message routes
router.post('/:id/messages', auth, sendMessage);
router.get('/:id/messages', auth, getMessages);

// Error handling for file uploads
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ message: 'File upload error.' });
  }
  next(err);
});

export default router; 