
import Database from "../database.js";
import { Sequelize } from "sequelize";

// eslint-disable-next-line no-unused-vars


export default Database.dbInstance.define('fund_documents', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
},
fund_id : {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    references: {
        model: 'funds',
        key: 'id'
    }
},
entity_type_id : {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
},
document_type_id : {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    references: {
        model: 'document_types',
        key: 'id'
    }
},
bucket_name : {
    type: Sequelize.STRING,
    allowNull: true
},
bucket_key : {
    type: Sequelize.JSON,
    allowNull: true
},
for: {
    type: Sequelize.ENUM( 'root','all','crp'),
    allowNull: false,
    defaultValue:"all"
},
is_required: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
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
  timestamps: false
});