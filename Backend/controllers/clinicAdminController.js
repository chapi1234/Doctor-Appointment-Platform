import Clinic from '../models/ClinicSchema.js';
import Doctor from '../models/DoctorSchema.js';

// Register a new clinic admin
export const registerClinicAdmin = async (req, res) => {
    const { email, password, name, phone, clinic_id } = req.body;
    try {
        const clinicAdmin = new ClinicAdmin({
            email,
            password,
            name,
            phone,
            clinic_id
        });
        await clinicAdmin.save();
        res.status(201).json({ success: true, message: 'Clinic admin registered successfully', data: clinicAdmin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering clinic admin', error });
    }
};

// Approve a doctor
export const approveDoctor = async (req, res) => {
    const { doctorId } = req.params;
    const clinicAdminId = req.user.id;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        doctor.isApproved = "approved";
        doctor.approvedBy = clinicAdminId;
        doctor.approvedByModel = "ClinicAdmin";
        await doctor.save();

        const clinic = await Clinic.findById(doctor.clinic_id);
        clinic.doctors.push(doctor._id);
        clinic.pendingDoctors = clinic.pendingDoctors.filter(id => id.toString() !== doctor._id.toString());
        await clinic.save();

        res.status(200).json({ success: true, message: 'Doctor approved', data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error approving doctor', error });
    }
};

// Cancel a doctor's registration
export const cancelDoctorRegistration = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        if (doctor.isApproved !== "pending") {
            return res.status(400).json({ success: false, message: 'Cannot cancel doctor registration after approval' });
        }

        const clinic = await Clinic.findById(doctor.clinic_id);
        clinic.pendingDoctors = clinic.pendingDoctors.filter(id => id.toString() !== doctor._id.toString());
        await clinic.save();

        await Doctor.findByIdAndDelete(doctorId);

        res.status(200).json({ success: true, message: 'Doctor registration canceled and doctor removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error canceling doctor registration', error });
    }
};

// Delete (remove) a doctor
export const deleteDoctor = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const clinic = await Clinic.findById(doctor.clinic_id);
        clinic.doctors = clinic.doctors.filter(id => id.toString() !== doctor._id.toString());
        clinic.pendingDoctors = clinic.pendingDoctors.filter(id => id.toString() !== doctor._id.toString());
        await clinic.save();

        await Doctor.findByIdAndDelete(doctorId);

        res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting doctor', error });
    }
};

// Get all pending doctors for a clinic admin
export const getPendingDoctors = async (req, res) => {
    const { clinicId } = req.params;
    try {
        const clinic = await Clinic.findById(clinicId).populate('pendingDoctors');
        if (!clinic) {
            return res.status(404).json({ success: false, message: 'Clinic not found' });
        }
        res.status(200).json({ success: true, message: 'Pending doctors retrieved successfully', data: clinic.pendingDoctors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving pending doctors', error });
    }
};
