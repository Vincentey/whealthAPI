import {loginUser} from "../controllers/register$login.js"
import express from "express"

const login= express.Router();

login.post("/login", loginUser)

export default login;