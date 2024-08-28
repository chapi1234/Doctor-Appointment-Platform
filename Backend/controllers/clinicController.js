import Clinic from '../models/ClinicSchema.js';

// Create a new clinic
export const createClinic = async (req, res) => {
    const { name, address_street, address_city, address_state, address_postalCode, address_country, email, phone, admin } = req.body;
    try {
        const clinic = new Clinic({
            name,
            address_street,
            address_city,
            address_state,
            address_postalCode,
            address_country,
            email,
            phone,
            admin
        });
        await clinic.save();
        res.status(201).json({ success: true, message: 'Clinic created successfully', data: clinic });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating clinic', error });
    }
};

// Update an existing clinic
export const updateClinic = async (req, res) => {
    const { clinicId } = req.params;
    try {
        const updatedClinic = await Clinic.findByIdAndUpdate(clinicId, req.body, { new: true });
        if (!updatedClinic) {
            return res.status(404).json({ success: false, message: 'Clinic not found' });
        }
        res.status(200).json({ success: true, message: 'Clinic updated successfully', data: updatedClinic });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating clinic', error });
    }
};

// Get a single clinic by ID
export const getClinic = async (req, res) => {
    const { clinicId } = req.params;
    try {
        const clinic = await Clinic.findById(clinicId).populate('admin doctors pendingDoctors');
        if (!clinic) {
            return res.status(404).json({ success: false, message: 'Clinic not found' });
        }
        res.status(200).json({ success: true, message: 'Clinic retrieved successfully', data: clinic });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving clinic', error });
    }
};

// Get all clinics
export const getAllClinics = async (req, res) => {
    try {
        const clinics = await Clinic.find().populate('admin doctors pendingDoctors');
        res.status(200).json({ success: true, message: 'Clinics retrieved successfully', data: clinics });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving clinics', error });
    }
};
