
import Database from "../database.js";
import { Sequelize } from "sequelize";

// eslint-disable-next-line no-unused-vars


const funds = Database.dbInstance.define('funds', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  named_id: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  type: {
    type: Sequelize.ENUM("fund"),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('accepted', 'rejected', 'screening', 'pending', 'review', 'draft', 'parked'),
    allowNull: false,
  },
  management_identity_id: {
    type: Sequelize.UUID,
    allowNull: true,
    references: {
      model: 'identity',
      key: 'id'
    }
  },
  administration_identity_id: {
    type: Sequelize.UUID,
    allowNull: true,
    references: {
      model: 'identity',
      key: 'id'
    }
  },
  logo_bucket_key: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: 'Fund logo url bucket key'
  },
  meta: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  region: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  fund_uuid: {
    type: Sequelize.UUID,
    defaultValue: null,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  deleted_at: {
    type: Sequelize.DATE,
    defaultValue: null
  },
}, {
  //tableName: "fund",
  timestamps: false
});

export default funds;