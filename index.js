import express from "express"
import register from "./routes/register-route.js"
import login from "./routes/loginroute.js"
import profileSetUp from "./routes/profileSetUpRoute.js"
import profileView from "./routes/profileViewRoute.js"
import profileEditAll from "./routes/profileEditAllRoute.js"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"

dotenv.config();
const app= express();

const port = process.env.PORT

connectDb();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/whealth/auth", register);
app.use("/whealth/auth", login)
app.use("/whealth/patientdashboard", profileSetUp )
app.use("/whealth/patientdashboard/", profileView )
app.use("/whealth/patientdashboard/", profileEditAll)

app.listen(port, ()=>{console.log(`listening on port ${port}`)})

