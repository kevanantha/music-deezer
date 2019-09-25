'use strict'
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          len: [3],
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          len: [3],
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [3],
          notEmpty: true,
        },
      },
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          const saltRounds = 10
          return bcrypt
            .hash(user.dataValues.password, saltRounds)
            .then(hash => {
              user.setDataValue('password', hash)
            })
            .catch(err => {
              throw new Error(err.message)
            })
        },
      },
    },
  )

  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
