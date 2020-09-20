import models from '../database/models';
import { model } from 'mongoose';

class userUtility {
    static async fetchUser(email) {
        const user = await models.User.findOne({
            where: {
                email
            }
        });

        return user;
    }
}

export default userUtility;