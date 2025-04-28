module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blogs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Blog;
};
