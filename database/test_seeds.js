require("./connect");

const ProjectModel = require("./models/project_model");
const UserModel = require("./models/user_model");


// const testProject = {
//   name: "Test-suite-project",
//   activated:  true,
//   address: {
//     line1: "test address, test street",
//     line2: "test-apartment 2",
//     postcode: "1234",
//     state: "NSW",
//     country: "test-country",
//     city: "test-city"
//   }
// }

let testUser = {
  firstName: "Test",
  lastName: "User",
  admin: false,
  email: 'testuser@user.com',
  projects: [],
  notifications: [],
}

const admin = {
  firstName: "Admin",
  lastName: "User",
  admin: true,
  email: process.env.ADMIN_USER,
  projects: [],
  notifications: []
}

// ProjectModel.create({...testProject}, (error, project) =>  {
// if(error){
//   console.log("-------------------------------");
//   console.log(error);
// } else {
//   console.log("-------------------------------");
//   console.log("Generating a project to conduct testing.");
//   console.log("created a test-project");
//   testProject = project;
// }
// });

UserModel.register({ ...testUser }, "password", function (err, user) {
if(err) {
  console.log("[_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-]")
  console.log(err);
}
console.log("[_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-]")
console.log("Succesfully created custom user");
return user;
});

UserModel.register({ ...admin }, process.env.ADMIN_USER_PASS, function(err, user) {
  if(err) {
    console.log(err);
  }

  console.log("Succesfully created admin user");
  console.log(user);
});

