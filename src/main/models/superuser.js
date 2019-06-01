"use strict";
module.exports = (sequelize, DataTypes) => {
  const Superuser = sequelize.define(
    "Superuser",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return Superuser;
};
