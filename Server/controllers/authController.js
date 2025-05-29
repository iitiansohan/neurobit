import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d",
    })
}

export const signup = async (req, res) => {
    const { email, password, name, role, gender } = req.body;

    try {
        let user = null;
        if (role == 'patient') {
            user = await User.findOne({ email })
        }
        else {
            user = await Doctor.findOne({ email })
        }


        if (user) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if (role == 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                gender,
                role
            });

        }
        if (role == 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                gender,
                role
            })
        }
        console.log(user);
        await user.save()
        res.status(200).json({ success: true, message: 'User created successfully' })

    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body

    try {
        let user = null
        const patient = await User.findOne({ email })
        const doctor = await Doctor.findOne({ email })

        if (patient) {
            user = patient
        }
        if (doctor) {
            user = doctor
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isPassword = bcrypt.compare(req.body.password, user.password);

        if (!isPassword) {
            return res.status(400).json({ status: false, message: "Invalid credentials" })
        }

        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc

        res.status(200)
            .json({ status: true, message: "Logged in successfully", token, data: { ...rest }, role });

    }
    catch (err) {
        res.status(500)
            .json({ status: false, message: "Failed to login" });

    }
}