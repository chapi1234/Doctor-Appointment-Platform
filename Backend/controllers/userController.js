import User from "../models/UserSchema.js";

import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async(req, res) => {
    const id = req.params.id 

    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res 
           .status(200)
           .json({
            success: true,
            message: "Successfully Updated", 
           });
    }catch(err){
        res.status(500).json({ success: false, message: "Failed to update"});
    }
}; 

export const deleteUser = async(req,res) => {
    const id = req.params.id;

    try{
        await User.findByIdAndDelete(
            id, 
        );

        res
          .status(200)
          .json({
            success: true,
            message: "Succesfully deleted",
          });
    }catch(err){
        res.status(500).json({success: false, message: "Failed to delete"});
    }
};

export const getSingleUser = async(req, res) => {
    const id = req.params.id 

    try {
        const user = await User.findById(id).select('-password');

        res 
           .status(200)
           .json({
            success: true,
            message: "User found",
            data: user 
           });
    }catch(err){
        res.status(500).json({ success: false, message: "No user found"});
    }
};

export const getAllUser = async(req, res) => {

    try {
        const users = await User.find({}).select('-password');

        res 
           .status(200)
           .json({
            success: true,
            message: "Users found", 
            data: users,
           });
    }catch(err){
        res.status(500).json({ success: false, message: "Not found"});
    }
};


export const getUserProfile = async(req,res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if(!user){
            return res
                .status(404)
                .json({ success: false, message: "User not found"})

        }

        const {password, ...rest} = user._doc


        res.status(200).json({success:true, message:'profile info is getting', data:{...rest}})
    }catch(err){
        res.status(500).json({success:false, message:'Something went wrong, cannot get'});
    }
};

export const getMyAppointments = async(req, res)=>{
    try{
        // retrieve appointments
        const bookings = await Booking.find({user:req.userId})
        //extract doctor ids
        const doctorIds = bookings.map(el=>el.doctor.id)
        //retrieve doctors
        const doctors = await Doctor.find({_id: {$in:doctorsIds}}).select('-password')
        res.status(200).json({success:true, message:'Appointments are getting', data:doctors})
    }catch (err){
        return res.status(404).json({success:false, message:'User not found'});
    }
};

