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

        if (user) {
            if (user.role != 2) {
              return res.status(403).json({
                success: false,
                message: 'You are not authorised to access this page',
              });
          }

          req.user = decodedToken;
          return next();
      
          } else {
            return res.status(403).json({
              success: false,
              message: 'You are not authorised to access this page',
            });
            
          }
      },
    );
  };

  export default authenticate;