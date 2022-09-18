import { ormCreateUser as _createUser,
         ormCheckUserExists as _checkUserExists,
         ormFindUser as _findUser,
         ormUpdateUser as _updateUser } from '../model/user-orm.js';
import { hashSaltPassword, verifyPassword } from '../services.js';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {

            const isUserExist = await _checkUserExists(username);
            if (isUserExist) {
                console.log(`Account Creation Failed due to duplicate username - ${username}`);
                return res.status(409).json({ message: 'Duplicate username. Could not create a new user.'});
            }

            const hashedPassword = await hashSaltPassword(password);
            const resp = await _createUser(username, hashedPassword);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({ message: 'Could not create a new user!' });
            }
            console.log(`Created new user ${username} successfully!`);
            return res.status(201).json({ message: `Created new user ${username} successfully!` });
        }
        return res.status(400).json({ message: 'Username and/or Password are missing!' });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when creating new user!' });
    }
}

export async function changePassword(req, res) {
    try {
        const {username, oldPassword, newPassword} = req.body;
        if (username && oldPassword && newPassword) {
            // verify user old password is correct
            const user = await _findUser(username);
            if (!user) {
                return res.status(400).json({ message: 'Authentication failed. User does not exist.'})
            }
            const isPasswordCorrect = await verifyPassword(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Authentication failed. Incorrect user or password provided.'})
            }
            console.log(`User ${username} has been authenticated.`);
            // store new password
            const hashedNewPassword = await hashSaltPassword(newPassword);
            const resp = await _updateUser(user, {username: username, password: hashedNewPassword});
            if (resp.err) {
                return res.status(400).json({ message: 'Could not update password!' });
            }
            console.log(`Updated password for user - ${username}`);
            return res.status(200).json({ message: 'Password has successfully been changed.'});
        }
        return res.status(400).json({ message: 'Username and/or Passwords are missing!'});
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when updating user password!'});
    }
}
