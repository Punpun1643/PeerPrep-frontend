// orm layer
import pendingMatchController from './controller.js';
import PendingMatch from './pendingMatch.js';

const pendingMatchOrm = {
    create: create,
    deleteByUsername: deleteByUsername,
    findAllPendingMatches: findAllPendingMatches,
};

function create(pendingMatch) {
    const newPendingMatch = new PendingMatch(pendingMatch);
    return newPendingMatch.save();
}

function deleteByUsername(username) {
    return PendingMatch.destroy({ where: { username: username } });
}

function findAllPendingMatches() {
    return PendingMatch.findAll();
}

// export functions to be called by controller
export default pendingMatchOrm;
