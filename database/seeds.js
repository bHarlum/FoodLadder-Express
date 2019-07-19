require("./connect");

const UserModel = require("./models/user_model");

const admin = {
  firstName: "Admin",
  lastName: "User",
  admin: true,
  email: process.env.ADMIN_USER,
  projects: [],
  notifications: []
}

UserModel.register({ ...admin }, process.env.ADMIN_USER_PASS, function(err, user) {
  if(err) {
    console.log(err);
  }

  console.log("Succesfully created admin user");
  console.log(user);
});
