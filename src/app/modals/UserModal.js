const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    default: "",
  },
  Email: {
    type: String,
    default: "",
  },
  Phone_no: {
    type: String,
    default: "",
  },
  Password: {
    type: String,
    default: "",
  },
  Avatar: {
    type: String,
    default: "",
  },
  Security_Q: {
    type: String,
    default: "",
  },
  Security_A: {
    type: [String],
    default: [],
  },
  Created_At: {
    type: String,
    default: function () {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}:${hours}-${minutes}-${seconds}`;
    },
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
