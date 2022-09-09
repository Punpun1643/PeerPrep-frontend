import pendingMatchOrm from './orm.js';

const pendingMatchController = {
    addPendingMatch: addPendingMatch,
    deleteByUsername: deleteByUsername,
    findAllPendingMatches: findAllPendingMatches,
};

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

function findAllPendingMatches(req, res) {
    pendingMatchOrm.findAllPendingMatches().then(
        (data) => {
            res.send(data);
        },
    ).catch((err) => {
        console.log(err);
    });
}

export default pendingMatchController;
