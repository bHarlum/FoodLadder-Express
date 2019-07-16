const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./../database/models/user_model');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy(function(email, password, done) {
      // Match Username
      UserModel.findOne(email, function(err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'No user found' });
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Wrong password' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
