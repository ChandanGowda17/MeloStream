import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        //if user already exists
        const user = await User.findOne({clerkid: id});
        if (!user) {
            await User.create({ 
                clerkid: id,
                fullname: `${firstName} ${lastName}`,
                imageUrl,
            });
        }
        res.status(200).json({success: true});
    } catch (error) {
        console.log("error in auth callback", error);
       next(error);
}
}
