import {registerUser} from "../controllers/register$login.js"
import express from "express"

const register= express.Router()

register.post("/register",registerUser)


export default register;

