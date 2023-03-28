module.exports = (sequelize, Sequelize) => {
  const Photo = sequelize.define("photo", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    albumId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    awsUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mimetype: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Photo;
};
