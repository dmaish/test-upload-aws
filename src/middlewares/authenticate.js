import jwt from 'jsonwebtoken';
import userUtility from '../helpers/fetchUser';

const authenticate = (req, res, next) => {
    let token = req.headers['authorization'] || req.body.token || req.query.token;

    if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No authentication token.Please log in.',
        });
      }
      
    token = token.slice(7, token.length);
  
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      async(error, decodedToken) => {
        if (error) {
          return res.status(401).json({
            success: false,
            message: 'Your authentication token has expired.Please log in.',
          });
        }

        //check if the user has been deactivated
        const {email} = decodedToken;
        const user = await userUtility.fetchUser(email);

        if (user.active === false) {
            return res.status(403).json({
              success: false,
              message: 'Your account has been deactivated.Contact admin for further details.',
            });
        }

        req.user = decodedToken;
        return next();
      },
    );
  };

  export default authenticate;
