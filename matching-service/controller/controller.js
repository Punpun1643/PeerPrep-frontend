import pendingMatchOrm from '../model/orm.js';

const pendingMatchController = {
    addPendingMatch: addPendingMatch,
    deleteByUsername: deleteByUsername,
    findAllPendingMatches: findAllPendingMatches,
    findPendingMatchByUsername: findPendingMatchByUsername,
    updatePendingMatch: updatePendingMatch,
    updatePendingMatchDifficulty: updatePendingMatchDifficulty,
};

/** Adds pending match to the database. */
function addPendingMatch(req, res) {
    const pendingMatch = req.body;

    pendingMatchOrm.create(pendingMatch).then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Deletes pending match from the database by username. */
function deleteByUsername(req, res) {
    pendingMatchOrm.deleteByUsername(req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfuly',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Retrieves all pending matches in the current database. */
function findAllPendingMatches(req, res) {
    pendingMatchOrm.findAllPendingMatches().then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Finds pending match by username. */
function findPendingMatchByUsername(req, res) {
    pendingMatchOrm.findPendingMatchByUsername(req.params.username).then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Updates an existing pending match by information. */
function updatePendingMatch(req, res) {
    pendingMatchOrm.updatePendingMatch(req.body, req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfully!',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

/** Updates an existing pending match difficulty level. */
function updatePendingMatchDifficulty(req, res) {
    pendingMatchOrm.updatePendingMatchDifficulty(req.body, req.params.username).then(
        (data) => {
            res.status(200).json({
                message: 'Pending match updated successfully!',
                pendingMatch: data,
            });
        },
    ).catch((err) => {
        console.log(err);
    });
}

export default pendingMatchController;
