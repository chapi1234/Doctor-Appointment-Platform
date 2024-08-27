import express from 'express';
import { approveClinic, removeClinic, registerAdmin, manageUsers, overrideClinicAdminDecision } from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.put('/approve-clinic/:clinicId', approveClinic);
router.delete('/remove-clinic/:clinicId', removeClinic);
router.get('/manage-users', manageUsers);
router.put('/override-decision/:doctorId', overrideClinicAdminDecision);

export default router;
