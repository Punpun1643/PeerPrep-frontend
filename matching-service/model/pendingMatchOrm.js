import orm from './orm.js';

const pendingMatchOrm = {
    addPendingMatchEasy: addPendingMatchEasy,
    addPendingMatchMedium: addPendingMatchMedium,
    addPendingMatchHard: addPendingMatchHard,
    deletePendingMatchEasy: deletePendingMatchEasy,
    deletePendingMatchById: deletePendingMatchById,
};

function addPendingMatchEasy(username) {
    const details = {
        username: username.username,
        difficulty: 'easy',
    };

    return orm.create(details);
}

function addPendingMatchMedium(username) {
    const details = {
        username: username.username,
        difficulty: 'medium',
    };

    return orm.create(details);
}

function addPendingMatchHard(username) {
    const details = {
        username: username.username,
        difficulty: 'hard',
    };

    return orm.create(details);
}

function deletePendingMatchById(params) {
    return orm.deleteById(params.id);
}

function deletePendingMatchEasy() {
    const pendingMatchToDelete = orm.findPendingMatchByDifficulty('easy');

    if (pendingMatchToDelete === null) {
        return null;
    }
    return orm.deleteById(pendingMatchToDelete.id);
}

export default pendingMatchOrm;
