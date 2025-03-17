import Joi from "joi";

export default class Util {

    static validateInvokeSchema(payload) {
        try {
            // Check if payload is an object
            if (typeof payload !== 'object' || payload === null) {
                throw new Error('Payload must be an object');
            }

            const schema = Joi.object({
                mode: Joi.string().valid('db').required(),
                action: Joi.object({
                    model: Joi.string().required(),
                    operation: Joi.string().required(),
                    attributes: Joi.array().optional(),
                    where: Joi.object().optional(),
                    limit: Joi.number().min(0).optional(),
                    offset: Joi.number().min(0).optional(),
                    order: Joi.array().optional(),
                    payload: Joi.object().optional(),
                }).required(),
                
            });

            // Validate the payload against the schema
            const result = schema.validate(payload, {
                abortEarly: false,
                stripUnknown: true,
                convert: true
            });

            // Check if validation failed
            if (result.error) {
                return { status: false, error: result.error.details };
            } else {
                return { status: true, value: result.value };
            }
        } catch (error) {
            // If an error occurs during validation, return false
            return { status: false, error: error };
        }
    }
    static convertStringToObject(str, data) {
        const parts = str.split('.');
        let result = {};
    
        let temp = result;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].replace(/\"/g, "");
            temp[part] = (i === parts.length - 1) ? data : {};
            temp = temp[part];
        }
    
        return result;
    }
    

}
