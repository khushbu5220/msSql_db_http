'use strict';

module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		UserID: {
			primaryKey: true,
			allowNull: false,
			unique: true,
			type: DataTypes.INTEGER
		},
        name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		age: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		marks: {
			type: DataTypes.STRING,
			allowNull: false
		},
        createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.Now,
		},
        updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.Now,
		},
        

	}, {
        timestamp: false,
    });



		return user
		
};

