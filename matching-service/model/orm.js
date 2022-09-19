// orm layer
import PendingMatch from './pendingMatch.js';

const pendingMatchOrm = {
    create: create,
    deleteByUsername: deleteByUsername,
    findAllPendingMatches: findAllPendingMatches,
    findPendingMatchByUsername: findPendingMatchByUsername,
    updatePendingMatch: updatePendingMatch,
    updatePendingMatchDifficulty: updatePendingMatchDifficulty,
};

/**
 * Creates a new pending match and add to the database.
 *
 * @param {object} pendingMatch consists of username and difficulty level.
 */
function create(pendingMatch) {
    const newPendingMatch = new PendingMatch(pendingMatch);
    return newPendingMatch.save();
}

/**
 * Deletes pending match by username.
 *
 * @param {string} username of the pending match to delete.
 */
function deleteByUsername(username) {
    return PendingMatch.destroy({ where: { username: username } });
}

/** Retrieves all pending matches in the database. */
function findAllPendingMatches() {
    return PendingMatch.findAll();
}

/**
 * Finds pending match by username in the database.
 *
 * @param {string} username of the pending match.
 */
function findPendingMatchByUsername(username) {
    return PendingMatch.findByPk(username);
}

/**
 * Updates an existing pending match information,
 * including both username and/or difficulty level.
 *
 * @param {object} pendingMatch consists of username and difficulty level.
 * @param {string} username of the pending match to update.
 */
function updatePendingMatch(pendingMatch, username) {
    const newPendingMatch = {
        username: pendingMatch.username,
        difficulty: pendingMatch.difficulty,
    };

    return PendingMatch.update(newPendingMatch, { where: { username: username } });
}

/**
 * Updates the difficulty level of an existing pending match in the database.
 *
 * @param {object} pendingMatch consists of username and difficulty level.
 * @param {string} username of the pending match to update.
 */
function updatePendingMatchDifficulty(pendingMatch, username) {
    const newPendingMatch = {
        username: username,
        difficulty: pendingMatch.difficulty,
    };

    return PendingMatch.update(newPendingMatch, { where: { username: username } });
}

// export functions to be called by controller
export default pendingMatchOrm;
