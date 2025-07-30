import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';




// Register
export const register = async (req, res) =>{
    const{name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({sucess: false, message: 'Missing user information!'})
    }
    try {
        const existingUser = await userModel.findOne({email});
        if (existingUser){
            return res.json ({sucess: false, messga: "User already exists!"})
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie("token", token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Sending Welcom Email

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Welcome to Carrier Connect', 
            text: 'Your account has been created'
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Login
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email, !password){
        return res.json({success: false, message: 'Email and Password are required!'})
    }

    try {

        const user = await userModel.findOne({email});
            if(!user){
                return res.json({success: false, message: "Invalid email or Password"});
            }

        const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.json({success: false, message: "Invalid email or password"});
            }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'})

        res.cookie("token", token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            return res.json({success: true})
    } catch (error) {
        return res.json ({success: false, message: error.message})
    }
}

//Logout

export const logout = async (req, res) =>{
    try {
        res.clearCookie('token', {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            saneSite: process.env.NODE_ENV === 'production' ? 'none' : "strict",
        })
        return res.json ({sucess: true, message: "Logged Out"})
        
    } catch (error) {
        return res.json ({sucess: false, message: error.message})
    }
}

// Send Vefification OTP to user's Email 
export const sendVerifyOtp = async (req, res) =>{
    try {

        const {UserId} = req.body;
        const user = await userModel.findById(userId);
        
        if(user.isAccountVerified){
            return res.json({success: false, message: "Account Already Verified"})
        
        }
       
        const otp = String(Math.floor(100000 + Math.random()*900000))

        user.verifyOtp =otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

            const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: 'Please verifiy OTP', 
            text: 'Your OTP code ${otp}'
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'Your account is verified'})
    
    } catch (error) {
        return res.json ({sucess: false, message: error.message})
    }
}