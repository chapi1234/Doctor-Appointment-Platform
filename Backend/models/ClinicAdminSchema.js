import mongoose from "mongoose";

const clinicAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },

  role: {
    type: String,
    default: "clinicAdmin", 
    enum: ["clinicAdmin"] 
  },

  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  clinic_id: { type: mongoose.Types.ObjectId, ref: "Clinic",required: true },
  approvedBy: { type: mongoose.Types.ObjectId, refPath: 'role' },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Add a pre-save hook to hash the password before saving the ClinicAdmin
clinicAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("ClinicAdmin", clinicAdminSchema);
