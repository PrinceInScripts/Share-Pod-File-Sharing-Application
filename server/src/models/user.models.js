import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalUploads: { type: Number, default: 0 },
  totalDownloads: { type: Number, default: 0 },
  videoCount: { type: Number, default: 0 },
  imageCount: { type: Number, default: 0 },
  documentCount: { type: Number, default: 0 },
  profilePic: { type: String, default: 'https://avatar.iran.liara.run/public/1' },  // Optional for user profile picture
  lastLogin: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export {User};