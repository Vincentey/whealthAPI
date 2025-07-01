import express from "express"
import {editProfile} from "../controllers/profileConcerns.js";
import protect from "../controllers/protect.js";

const profileEditAll= express.Router();

profileEditAll.put("/editProfile/:patientId", protect, editProfile)

export default profileEditAll;