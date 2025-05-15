import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  downloadedContent: {
    type: Number,
    required: true,
    default: 0,
  },

  // ✅ Optional Password Protection
  isPasswordProtected: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String, // store hashed password using bcrypt
    default: null,
  },

  // ✅ Optional Expiry
  hasExpiry: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: null,
  },

  // ✅ Status (active/inactive)
  status: {
    type: String,
    enum: ['active', 'expired', 'deleted'],
    default: 'active',
  }

}, { timestamps: true });

export const File = mongoose.model("File", fileSchema);
