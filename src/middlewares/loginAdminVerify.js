import userUtility from '../helpers/fetchUser';

const adminVerify = async(req, res, next) => {
    const {email} = req.body;
    const user = await userUtility.fetchUser(email);

    if (user) {
      if (user.role != 2) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorised to access this page',
        });
    }
    
    return next();

    } else {
      return res.status(403).json({
        success: false,
        message: 'You are not authorised to access this page',
      });
      
    }
}

export default adminVerify;