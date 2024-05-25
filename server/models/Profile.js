const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contact: {
		type: String,
	},
});

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);