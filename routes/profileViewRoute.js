import express from "express"
import {viewProfile} from "../controllers/profileConcerns.js";
import protect from "../controllers/protect.js";

const profileView= express.Router();

profileView.get("/parentPatientProfile/:patientId", protect, viewProfile)

export default profileView;