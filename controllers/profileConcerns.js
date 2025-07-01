import ProfileDetails from "../models/profiledetails.js";
import User from "../models/usersmodel.js";

const setUpProfile = async (req, res) => {
  console.log("Received profile data:", req.body);
  const {
    image,
    Sex,
    Religion,
    Nationality,
    Contact_no,
    Email,
    Address,
    BloodGroup,
    Genotype,
    DateOfBirth,
    PastSurgicalHistory,
    ChronicConditions,
  } = req.body;
  if (
    !image ||
    !Sex ||
    !Religion ||
    !Contact_no ||
    !Nationality ||
    !Email ||
    !Address ||
    !BloodGroup ||
    !Genotype ||
    !DateOfBirth ||
    !PastSurgicalHistory ||
    !ChronicConditions
  ) {
    return res.status(400).json({ message: "Incomplete profile Details" });
  }

  try {
    const ver_user = await User.findOne({ email: Email });

    if (!ver_user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProfileDetails = new ProfileDetails({
      patientId: ver_user.userId,
      image,
      Sex,
      Religion,
      Contact_no,
      Nationality,
      Address,
      Email,
      BloodGroup,
      Genotype,
      DateOfBirth,
      PastSurgicalHistory,
      ChronicConditions,
    });

    console.log(newProfileDetails);
    const result = await newProfileDetails.save();
    if (result) {
      return res
        .status(200)
        .json({ message: "Profile Setup Successfully", data: result });
    }
  } catch (e) {
    return res.status(500).json({ message: "Error saving profile" });
  }
};

const viewProfile = async (req, res) => {
  const identityNum = req.params.patientId;

  try {
    const authUser = await ProfileDetails.findOne({ patientId: identityNum });

    if (!authUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ data: authUser });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error loading profile" });
  }
};

const editProfile = async (req, res) => {
  const { patientId } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await ProfileDetails.findOneAndUpdate(
      {patientId:patientId},
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res
      .status(200)
      .send({ message: "Profile Setup Successfully", data: updatedUser });
  } catch (e) {
    return res
      .status(500)
      .send({ error: "An error occurred during profile" });
  }
};

export { setUpProfile, viewProfile, editProfile };
