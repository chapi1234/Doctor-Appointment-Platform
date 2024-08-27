import express from 'express';
import { createClinic, updateClinic, getClinic, getAllClinics } from '../controllers/clinicController.js';

const router = express.Router();

router.post('/create', createClinic);
router.put('/:clinicId', updateClinic);
router.get('/:clinicId', getClinic);
router.get('/', getAllClinics);

export default router;
