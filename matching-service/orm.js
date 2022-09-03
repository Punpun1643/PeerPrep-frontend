// orm layer
import PendingMatch from './pendingMatch.js';

const pendingMatchOrm = {
    create: create,
    deleteByUsername: deleteByUsername,
};

function create(pendingMatch) {
    const newPendingMatch = new PendingMatch(pendingMatch);
    return newPendingMatch.save();
}

function deleteByUsername(username) {
    return PendingMatch.destroy({ where: { username: username } });
}

// export functions to be called by controller
export default pendingMatchOrm;
