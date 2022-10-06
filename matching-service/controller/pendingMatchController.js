import pendingMatchOrm from '../model/pendingMatchOrm.js';

const pendingMatchController = {
    addPendingMatchEasy: addPendingMatchEasy,
    addPendingMatchMedium: addPendingMatchMedium,
    addPendingMatchHard: addPendingMatchHard,
    deletePendingMatchById: deletePendingMatchById,
    deleteMatchByDifficulty: deleteMatchByDifficulty,
    deletePendingMatchByUsername: deletePendingMatchByUsername,
    getAvailableMatch: getAvailableMatch,
};

function addPendingMatchEasy(socketid, username) {
    console.log(socketid);
    pendingMatchOrm.addPendingMatchEasy(socketid, username);
}

function addPendingMatchMedium(socketid, username) {
    console.log(socketid);
    pendingMatchOrm.addPendingMatchMedium(socketid, username);
}

function addPendingMatchHard(socketid, username) {
    console.log(socketid);
    pendingMatchOrm.addPendingMatchHard(socketid, username);
}

function deletePendingMatchById(socketid) {
    pendingMatchOrm.deletePendingMatchById(socketid);
}

// testing 22/09/2022
function deletePendingMatchByUsername(params) {
    pendingMatchOrm.deletePendingMatchByUsername(params);
}

function deleteMatchByDifficulty(difficulty) {
    pendingMatchOrm.deleteMatchByDifficulty(difficulty);
}

async function getAvailableMatch(difficulty) {
    return pendingMatchOrm.getAvailableMatch(difficulty);
}

export default pendingMatchController;
