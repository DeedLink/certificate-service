import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['power_of_attorney', 'last_will', 'rent_agreement', 'other']
  },
  title: { type: String, required: true },
  description: { type: String },
  parties: [
    {
      name: String,
      role: String,
      contact: String
    }
  ],
  data: { type: Object },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CertificateSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Certificate', CertificateSchema);