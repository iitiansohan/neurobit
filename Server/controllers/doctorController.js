import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res
            .status(200)
            .json({ success: true, message: "Successfully updated", data: updateDoctor });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to update" });
    }
}


export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await Doctor.findByIdAndDelete(id)

        res
            .status(200)
            .json({ success: true, message: "Successfully deleted" });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to delete" });
    }
}


export const getDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Doctor.findById(id).select("-password");

        res
            .status(200)
            .json({ success: true, message: "Successfully fetched doctor", data: user });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "No such doctor exists" });
    }
}


export const getDoctors = async (req, res) => {
    const id = req.params.id;
    try {
        const users = await Doctor.find({}).select("-password");

        res
            .status(200)
            .json({ success: true, message: "Successfully fetched doctors", data: users });
    }
    catch (err) {

        res
            .status(500)
            .json({ success: false, message: "Failed to fetch doctors" });
    }
}

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId;
    try {
        const doctor = await Doctor.findById(doctorId);

        if(!doctor){
            return res.status(404).json({success:false, message: 'Doctor not found'})
        }
        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId});

        res.status(200).json({success:true, message: 'Getting profile info',data:{...rest, appointments}})
        
    } catch (error) {
        res.status(500).json({success:false, message:"something went wrong"});
    }
}