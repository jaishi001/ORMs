module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Contact",
    {
      currentAddress: {
        type: DataTypes.STRING,
      },
      permanentAddress: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "contacts",
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    }
  );
};
