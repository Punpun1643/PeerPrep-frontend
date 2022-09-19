import { DataTypes } from 'sequelize';
import db from '../repository.js';

const PendingMatch = db.define('pendingMatches', {
    // define match model attributes
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'pendingMatches',
});

export default PendingMatch;
