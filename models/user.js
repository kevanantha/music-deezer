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
          isUnique(value) {
            return User.findOne({
              where: {
                username: value,
              },
            }).then(user => {
              if (user) {
                throw new Error('User already exist')
              }
            })
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          len: [3],
          notEmpty: true,
          isUnique(value) {
            return User.findOne({
              where: {
                email: value,
              },
            }).then(user => {
              if (user) {
                throw new Error('User already exist')
              }
            })
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [6],
          notEmpty: true,
        },
      },
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
        // beforeUpdate: (user, options) => {
        //   User.findByPk(user.dataValues.id, {
        //     where: {
        //       username: user.dataValues.username
        //     }
        //   })
        //     .then(data => {
        //       if (data.id == user.datavalues.id) {
        //         throw new Error('username already exist')
        //       }
        //     })
        //     .catch(err => {
        //       throw new Error(err.message)
        //     })
        // }
      },
    },
  )

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Song, { through: models.Playlist })
  }
  return User
}
