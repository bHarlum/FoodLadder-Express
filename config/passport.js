const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const UserModel = require("./../database/models/user_model");

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

passport.use(new LocalStrategy({
    usernameField: 'email'  
  },
  async (email, password, done) => {
    try {
      console.log("running local strategy");
      const { user } = await UserModel.authenticate()(email, password);
      if (user) {
          return done(null, user);
      }
      return done(null, false, { message: 'Incorrect password.' });
    } catch (error) {
      done(error);
    }
    
  }
));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
async (jwt_payload, done) => {
  try {
    console.log(jwt_payload);
    const user = await UserModel.findById(jwt_payload.sub);

    if (!user) {
        return done(null, false);
    }
    
    return done(null, user);           
  } catch (error) {
      return done(error);
  }
}
));

module.exports = passport;