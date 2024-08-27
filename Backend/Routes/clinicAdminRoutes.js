import express from 'express';
import { registerClinicAdmin, approveDoctor, cancelDoctorRegistration, deleteDoctor, getPendingDoctors } from '../controllers/clinicAdminController.js';

const router = express.Router();

router.post('/register', registerClinicAdmin);
router.put('/approve-doctor/:doctorId', approveDoctor);
router.delete('/cancel-doctor/:doctorId', cancelDoctorRegistration);
router.delete('/delete-doctor/:doctorId', deleteDoctor);
router.get('/pending-doctors/:clinicId', getPendingDoctors);

export default router;
