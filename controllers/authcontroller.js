const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("the email is:",email,"and the password is:",password)

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and Password are required." });
//     }

    
//     const storedEmailHash = process.env.EMAIL_HASH;
//     const storedPasswordHash = process.env.PASSWORD_HASH;
//     console.log(storedEmailHash,storedPasswordHash)


  
//     const isEmailValid = await bcrypt.compare(email, storedEmailHash);
//     const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

//     if (!isEmailValid || !isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password." });
//     }


//     const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("the email is:", email, "and the password is:", password);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    const trimmedEmail = email.trim();
const trimmedPassword = password.trim();
    console.log("the email is:",email)
    console.log('the password is :',password)
    // Get stored email and password directly from environment variables
    const storedEmail = process.env.email;
    const storedPassword = process.env.password;
    console.log(storedEmail, storedPassword);

    // Compare email and password directly (no hashing)
    if (email.trim().toLowerCase() !== storedEmail.trim().toLowerCase() ||password.trim().toLowerCase() !== storedPassword.trim().toLowerCase() ) {
      console.log('not correct the email and password ')
      return res.status(401).json({ message: "Invalid email or password." });
    }

  
    // Generate JWT token if login is successful
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Return success response with the token
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}




