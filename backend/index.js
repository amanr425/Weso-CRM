import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

import authRoutes from './routes/auth.js'; // ✅ import auth route
import customerRoutes from './routes/customerRoutes.js'; // ✅ import auth route
import inquiryRoutes from './routes/inquiryRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import sendInquiryEmail from './routes/sendInquiryEmail.js';
import sendQuoteRoute from './routes/sendQuoteRoute.js'
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use('/api', authRoutes); // ✅ use /api prefix
app.use('/api/customers', customerRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/completedquote',sendQuoteRoute)
app.use('/api/send-inquiry-mails',sendInquiryEmail);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
