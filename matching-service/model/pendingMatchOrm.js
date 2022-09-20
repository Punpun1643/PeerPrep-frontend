import orm from './orm.js';

const pendingMatchOrm = {
    addPendingMatchEasy: addPendingMatchEasy,
    addPendingMatchMedium: addPendingMatchMedium,
    addPendingMatchHard: addPendingMatchHard,
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

export default pendingMatchOrm;
