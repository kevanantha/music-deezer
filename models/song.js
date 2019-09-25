'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Song extends Model {}

  Song.init(
    {
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
    Song.belongsToMany(models.User, {
      through: models.Playlist,
      foreignKey: 'SongId',
    })
  }
  return Song
}
