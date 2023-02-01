import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";

export const Chirp = sequelize.define("Chirp", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageMetadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

// replies to chirps are also chirps
Chirp.hasMany(Chirp);
Chirp.belongsTo(Chirp);
