import Admin from '../models/AdminSchema.js';
import Clinic from '../models/ClinicSchema.js';
import Doctor from '../models/DoctorSchema.js';
import ClinicAdmin from '../models/ClinicAdminSchema.js';

// Register a new system admin
export const registerAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const admin = new Admin({ email, password, name });
        await admin.save();
        res.status(201).json({ success: true, message: 'Admin registered successfully', data: superadmin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering admin', error });
    }
};
 
// Approve a clinic
export const approveClinic = async (req, res) => {
    const { clinicId } = req.params;
    const adminId = req.user.id;

    try {
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ success: false, message: 'Clinic not found' });
        }

        clinic.isApproved = "approved";
        clinic.approvedBy = adminId;
        await clinic.save();

        res.status(200).json({ success: true, message: 'Clinic approved', data: clinic });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error approving clinic', error });
    }
};

// Remove a clinic
export const removeClinic = async (req, res) => {
    const { clinicId } = req.params;

    try {
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ success: false, message: 'Clinic not found' });
        }

        await Doctor.deleteMany({ clinic_id: clinicId });
        await ClinicAdmin.deleteOne({ clinic_id: clinicId });
        await Clinic.findByIdAndDelete(clinicId);

        res.status(200).json({ success: true, message: 'Clinic removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing clinic', error });
    }
};

// Manage users
export const manageUsers = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        const clinicAdmins = await ClinicAdmin.find();
        const admins = await Admin.find();

        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: { doctors, clinicAdmins, admins },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving users', error });
    }
};

// Override a clinic admin's decision
export const overrideClinicAdminDecision = async (req, res) => {
    const { doctorId } = req.params;
    const adminId = req.user.id;

    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        doctor.isApproved = "approved";
        doctor.approvedBy = adminId;
        doctor.approvedByModel = "Admin";
        await doctor.save();

        res.status(200).json({ success: true, message: 'Clinic admin decision overridden, doctor approved', data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error overriding decision', error });
    }
};
