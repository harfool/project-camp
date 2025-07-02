import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `https://placehold.co/600x400`,
        localpath: "",
      },
    },
    userName: {
      type: String,
      Request: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      Request: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      Request: true,
    },
    password: {
      type: String,
      Request: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    refreshToken: {
      type: Date,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);


// encrypt password
userSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password , 10)
    next()
})

// compare password
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password , this.password)
}

// generate access token
userSchema.methods.generateAccessToken =  function () {
   return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            userName : this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// generate refresh token
userSchema.methods.generateRefreshToken =  function () {
    return jwt.sign(
         {
             _id : this._id,
             email : this.email,
             userName : this.userName
         },
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
     )
 }

 // email verification token
 userSchema.methods.generateTemporaryToken = function (){
   // generate token
    const unHashedToken = crypto.randomBytes(32).toString("hex")
   // hash token
    const hashToken = crypto.createHash("sha256").update(unHashedToken).digest("hex")
    // token expiry
    const tokenExpiry = Date.now() + (1000 * 60 * 20)  // min
    
    return {unHashedToken , hashToken , tokenExpiry}

 }

export const User = mongoose.model("User", userSchema);
