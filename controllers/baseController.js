import Util from "../utils.js";
import fs from "fs";
const models = {};
async function readModels() {
    let dirFiles = fs.readdirSync("./database/models");
    let modelName = dirFiles.filter(file => file.includes(".js")).map(file => file.replace(".js", ""));
    for (let model of modelName) {
        let impModel = await import(`../database/models/${model}.js`);
        models[model] = impModel.default;
    }
}

await readModels();





/**
 * @class BaseController
 * Base controller for all controllers
 * @property {Object} model - The model associated with the controller
 * @property {Object} models - The models associated with all controllers
 */
export default class BaseController {
    static models = models;
    constructor(model) {
        this.model = model;
        this.models = models
    }
    /**
     * @method read
     * Read data from the database
     * @param {Object} queryParameters - The query parameters to use
     * @param {String} model - The model to use
     * @returns {Object} The data read from the database
     */
    static async read(queryParameters, model) {
        try {
            let result = await models[model].findAll(queryParameters);
            result = result.map(element => {
                for (let dv of Object.keys(element.dataValues)) {
                    if (queryParameters.jsonQuery.includes(dv)) {
                        try {
                            element.dataValues[dv] = JSON.parse(element.dataValues[dv]);
                        }
                        catch (error) {
                            element.dataValues[dv] = element.dataValues[dv];
                        }
                        element.dataValues = Object.assign(element.dataValues, Util.convertStringToObject(dv, element.dataValues[dv]));
                        delete element.dataValues[dv];
                    }
                }
                return element.dataValues;
            })

            return result;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @method create
     * Create data in the database
     * @param {Object} queryParameters - The query parameters to use
     * @param {String} model - The model to use
     * @param {Object} payload - The data to create
     * @returns {Object} The data created in the database
     */
    static async create(queryParameters, model, payload) {
        try {
            let result = await models[model].create(payload);
            return result.dataValues;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @method bulkcreate
     * Create data in the database in bulk
     * @param {Object} queryParameters - The query parameters to use
     * @param {String} model - The model to use
     * @param {Object} payload - The data to create
     * @returns {Object} The data created in the database
     */
    static async bulkcreate(queryParameters, model, payload) {
        try {
            let result = await models[model].bulkCreate(payload.data);
            return result.dataValues;
        } catch (error) {
            throw error;
        }
    }
    /**
     * @method update
     * Update data in the database
     * @param {Object} queryParameters - The query parameters to use
     * @param {String} model - The model to use
     * @param {Object} payload - The data to update
     * @returns {Object} The data updated in the database
     */
    static async update(queryParameters, model, payload) {
        try {
            let result = await models[model].update(payload, queryParameters);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method delete
     * Delete data from the database
     * @param {Object} queryParameters - The query parameters to use
     * @param {String} model - The model to use
     * @returns {Object} The data deleted from the database
     *
     */
    static async delete(queryParameters, model) {
        try {
            let result = await models[model].destroy(queryParameters);
            return result;
        } catch (error) {
            throw error;
        }
    }

}