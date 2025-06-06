import { clerkClient } from '@clerk/express';

export const protectedRoute = async (req, res, next) => {
if (!req.auth.userId) {
    return res.status(401).json({ message: 'Unauthorized- Please login to continue' });
    
}

next();
}
 

export const requireAdmin = async (req, res, next) => {
try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) { 
        return res.status(403).json({ message: 'unauthorized You must be an ADMIN' });
        
    }

    next();
} catch (error) {
    next(error);
}
};


