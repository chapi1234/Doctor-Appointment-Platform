// import mongoose from 'mongoose';
// import User from '../models/UserSchema.js';
// import Doctor from '../models/DoctorSchema.js';
// import Clinic from '../models/ClinicSchema.js';
// import Admin from '../models/AdminSchema.js';
// import ClinicAdmin from '../models/ClinicAdminSchema.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// const generateToken = user => {
//     return jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: "60d" }
//     );
// };

// export const register = async (req, res) => {
//     const { email, password, name, role, photo, gender, doctorType, clinicId } = req.body;

//     try {
//         let user = null;

//         // Check if the user already exists
//         if (role === 'patient') {
//             user = await User.findOne({ email });
//         } else if (role === 'doctor') {
//             user = await Doctor.findOne({ email });
//         } 
//         // else if (role === 'admin') {
//         //     user = await Admin.findOne({ email });
//         // }

//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         if (role === 'patient') {
//             user = new User({
//                 name,
//                 email,
//                 password: hashPassword,
//                 photo,
//                 gender,
//                 role
//             });
//         } else if (role === 'doctor') {
//             if (doctorType === 'self') {
//                 // Find a superadmin to approve the self doctor
//                 // let admin = await Admin.findOne({ role: 'superadmin' });

//                 // if (!admin) {
//                 //     return res.status(404).json({ message: 'Superadmin not found' });
//                 // }

//                 // Create the doctor and automatically approve them
//                 user = new Doctor({
//                     name,
//                     email,
//                     password: hashPassword,
//                     photo,
//                     gender,
//                     role,
//                     isApproved: "approved",
//                     doctorType,
//                     approvedBy: admin._id,
//                     approvedByModel: "Admin"
//                 });

//                 // Create a new clinic for this doctor
//                 const clinic = new Clinic({
//                     name: `${name}'s Clinic`,
//                     admin: user._id,
//                     doctors: [user._id],
//                     createdBy: user._id,
//                     updatedBy: user._id,
//                     isApproved: "approved"
//                 });

//                 await clinic.save();
//             } else if (doctorType === 'clinic doctor') {
//                 if (!clinicId) {
//                     return res.status(400).json({ message: 'Clinic ID is required for clinic doctor registration' });
//                 }

//                 const clinic = await Clinic.findById(clinicId);

//                 if (!clinic) {
//                     return res.status(404).json({ message: 'Clinic not found' });
//                 }

//                 user = new Doctor({
//                     name,
//                     email,
//                     password: hashPassword,
//                     photo,
//                     gender,
//                     role,
//                     isApproved: "pending",
//                     doctorType,
//                     clinic_id: clinicId
//                 });

//                 clinic.pendingDoctors.push(user._id);
//                 await clinic.save();
//             }
//         } else if (role === 'superadmin') {
//             // Register a new admin
//             user = new Admin({
//                 name,
//                 email,
//                 password: hashPassword,
//                 role
//             });
//         }

//         await user.save();
//         res.status(200).json({ success: true, message: 'User successfully created' });
//     } catch (err) {
//         console.error('Error during registration:', err);
//         res.status(500).json({ success: false, message: 'Internal server error, try again' });
//     }
// };


// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, user.password);

//         if (!isPasswordMatch) {
//             return res.status(400).json({ status: false, message: "Invalid Credentials" });
//         }

//         const token = generateToken(user);
//         const { password: userPassword, role, appointments, ...rest } = user._doc;

//         res.status(200).json({ 
//             status: true,
//             message: "Successfully Login",
//             token,
//             data: { ...rest },
//             role,
//         });
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).json({ status: false, message: "Failed to login" });
//     }
// };

import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import clinicAdmin from '../models/ClinicAdminSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "60d" }
    );
};

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email });
        } else if (role === 'clinicAdmin'){
            user = await clinicAdmin.findone({email});
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        if (role === 'clinicAdmin') {
            user = new clinicAdmin({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();
        res.status(200).json({ success: true, message: 'User successfully created' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ success: false, message: 'Internal server error, Try again' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }
        

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid Credentials" });
        }

        // Get token
        const token = generateToken(user);

        const { password:userPassword, role, appointments, ...rest } = user._doc;

        res.status(200).json({ 
            status: true,
            message: "Successfully Login",
            token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ status: false, message: "Failed to login" });
    } 
}
