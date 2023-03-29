module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    originalUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    ipAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userAgent: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    referer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Session;
};
