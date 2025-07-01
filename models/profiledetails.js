import mongoose from 'mongoose';

const profiledetails= new mongoose.Schema({
    patientId: {type: String},
    image: {type: String, required: true, default: ''},
    Sex: {type: String, enum:['male', 'female', 'others'], required: true},
    Religion: {type: String, required: true},
    Nationality: {type: String, required: true},
    Contact_no: {type: String, required: true},
    Address: {type: String, required: true, max: 250},
    Email: { type: String, required: true, unique: true },
    BloodGroup: {type: String, enum: ['A+', 'A', 'B+', 'B', 'AB+', 'AB', 'O+', 'O'], required: true},
    Genotype: {type: String, enum: ['AA', 'AS', 'SS', 'SC'], required: true},
    DateOfBirth: {type: String, required: true},
    PastSurgicalHistory: {type: String, enum:['Yes', 'No'], required: true},  
    ChronicConditions: {type: String,  enum:['None', 'Hypertension', 'Diabetes Mellitus', 'Obesity', 'Asthma', 'Chronic Kidney Disease', 'Heart Disease', 'Arthritis', 'Others'], required: true} 
})

const ProfileDetails= new mongoose.model("ProfileDetails", profiledetails)

export default ProfileDetails;