const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    id: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: String },
    mobile: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
