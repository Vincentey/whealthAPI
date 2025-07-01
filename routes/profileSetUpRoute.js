import express from "express"
import {setUpProfile} from "../controllers/profileConcerns.js";
import protect from "../controllers/protect.js";

const profileSetUp= express.Router();

profileSetUp.post("/patientProfileSetUp", protect, setUpProfile)

export default profileSetUp;

