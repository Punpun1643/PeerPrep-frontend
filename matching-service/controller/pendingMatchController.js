import pendingMatchOrm from '../model/pendingMatchOrm.js';

const pendingMatchController = {
    addPendingMatchEasy: addPendingMatchEasy,
    addPendingMatchMedium: addPendingMatchMedium,
    addPendingMatchHard: addPendingMatchHard,
    deletePendingMatchById: deletePendingMatchById,
    deleteMatchByDifficulty: deleteMatchByDifficulty,
    getAvailableMatch: getAvailableMatch,
};

function addPendingMatchEasy(username, id) {
    console.log(id);
    pendingMatchOrm.addPendingMatchEasy(username);
}

function addPendingMatchMedium(username, id) {
    console.log(id);
    pendingMatchOrm.addPendingMatchMedium(username);
}

function addPendingMatchHard(username, id) {
    console.log(id);
    pendingMatchOrm.addPendingMatchHard(username);
}

function deletePendingMatchById(params) {
    pendingMatchOrm.deletePendingMatchById(params);
}

function deleteMatchByDifficulty(difficulty) {
    pendingMatchOrm.deleteMatchByDifficulty(difficulty);
}

async function getAvailableMatch(difficulty) {
    return pendingMatchOrm.getAvailableMatch(difficulty);
}

export default pendingMatchController;
