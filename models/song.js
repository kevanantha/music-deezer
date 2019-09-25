'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Song extends Model {}

  Song.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      preview: DataTypes.STRING,
      artist: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Song',
    },
  )
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsToMany(models.User, { through: models.Playlist })
  }
  return Song
}
