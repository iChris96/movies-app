import { Users } from '../models/Users';

export default (() => {
    return {
        findUser: async (email: string) => {
            const user = await Users.findOne({ email }); // find user by email
            return user;
        },
    };
})();
