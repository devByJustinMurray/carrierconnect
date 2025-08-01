import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';





// Register
export const register = async (req, res) =>{
    const{name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing user information!'})
    }
    try {
        const existingUser = await userModel.findOne({email});
        if (existingUser){
            return res.json ({success: false, messga: "User already exists!"})
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
        return res.json ({success: true, message: "Logged Out"})
        
    } catch (error) {
        return res.json ({success: false, message: error.message})
    }
}

// Send Vefification OTP to user's Email 
export const sendVerifyOtp = async (req, res) =>{
    try {

        const userId = req.userId;
        const user = await userModel.findById(userId);
        if(!user){
            return res.json ({success: false, message: "User not found"})
         }
        if(user.isAccountVerified){
            return res.json({success: false, message: "Account Already Verified"})
        
        }
       
        const otp = String(Math.floor(100000 + Math.random()*900000))

        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

            const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: 'Please verifiy OTP', 
            text: `Your OTP is ${otp}. It will expire in 24 hours.`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'Check your email for OTP'})
    
    } catch (error) {
        return res.json ({success: false, message: error.message})
    }
}
// Verify Email with OTP
export const verifiedEmail = async (req, res) => {
    const userId = req.userId;
    const {otp} = req.body;
    
    
    if (!userId || !otp) {
        return res.json({success: true, message: 'Missing details'})
    }
    try {
        const user = await userModel.findById(userId);
        
        if(!user || !otp){
            return res.json ({success: false, message: "User not found"})
        }

        if(user.verifyOtp === "" || user.verifyOtp !== otp){
            return res.json ({success: false, message: "invaild OTP"})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json ({success: false, message: "OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;

        await user.save();
        
        return res.json({success: true, message: "Email verified successfully"})

    } catch (error) {
        return res.json ({success: false, message: error.message})
    }
}

// check if user is authenicated

export const isAuthenticated = async (req, res, next) => {
    try {
        return res.json({success: true});       
    } catch (error) {
        res.json({success: false, message: error.message}); 
    }
};

// Send password reset OTP to user's email

export const sendResetOtp = async (req, res) => {
    const {email} = req.body

    if (!email){
        return res.json({success: false, message: 'Email is required!'})
    }

    try {
        const user = await userModel.findOne({email});

        if (!user) {   
            return res.json({success: false, message: 'User not found!'});
        }

                const otp = String(Math.floor(100000 + Math.random()*900000))

        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 60 * 1000

        await user.save();

            const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: user.email,
            subject: 'Reset OTP for Carrier Connect', 
            text: `Your OTP is ${otp}. It will expire in 15 Minutes.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'Check your email for Reset OTP'})

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Verify Reset OTP and reset password

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        res.json({success: false, message: 'Email, OTP and new password are required!  '});
    }
    try {
        const user = await userModel.findOne({email}); 
        if (!user) {
            return res.json({success: false, message: 'User not found!'});
        }
        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP Expired'});
        }
        const hashedPassword = await bcrypt.hash (newPassword, 10)
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        
        await user.save();
        return res.json({success: true, message: 'Password reset successfully'});

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}