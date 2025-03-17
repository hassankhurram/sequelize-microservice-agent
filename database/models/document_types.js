
import Database from "../database.js";
import { Sequelize } from "sequelize";

// eslint-disable-next-line no-unused-vars


const funds = Database.dbInstance.define('document_types', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  entity_type_id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false
  },
  key: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false
  },
  form_detail_id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: true,
    unique: true,
    references: {
      model: 'form_details',
      key: 'id'
    }
  },
  bucket_name: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  bucket_key: {
    type: Sequelize.STRING,
    allowNull: true
  },
  value_en: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  value_zh: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  has_document_number: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  has_issued_date: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  has_expiry_date: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  has_amount: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  parent_id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: true,
    references: {
      model: 'document_types',
      key: 'id'
    }
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW')
  }
}, {
  //tableName: "fund",
  timestamps: false
});

export default funds;