'use strict'
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Playlist extends Model {}

  Playlist.init(
    {
      UserId: DataTypes.INTEGER,
      SongId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Playlist',
    },
  )
  Playlist.associate = function(models) {
    // associations can be defined here
  }
  return Playlist
}
