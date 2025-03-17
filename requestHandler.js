import BaseController from "./controllers/baseController.js";
import { Sequelize } from "sequelize";
export default async function requestHandler(body)
{
    return new Promise(async (resolve, reject) => {
        try {     
            const mode = body.mode;
            const action = body.action;
            const payload = action.payload;
            const model = action.model;
            const operation = action.operation;
            const attributes  = action.attributes ? action.attributes : [];
            const limit = action.limit ? action.limit : 0;
            const offset = action.offset ? action.offset : 0;
            const order = action.order ? action.order : [];
            const where = action.where ? action.where : {};
            const queryParameters = {where, attributes};
            if(limit)
            {
                queryParameters.limit = limit
            }
            if(offset)
            {
                queryParameters.offset = offset;
            }
            if(order.length > 0)
            {
                queryParameters.order = order;
            }
            // if(attributes.length > 0)
            // if(queryParameters.attributes.length == 0){
            //     delete queryParameters.attributes;
            // }
            switch(mode)
            {
                case "db":{
                    resolve(await handleModeDB(model, operation, queryParameters, payload))
                }
            }

            return {model, operation, where}
        
        } catch (error) {
            reject(error)
        }
    });
}

async function handleModeDB(model, operation, queryParameters, payload)
{
    return new Promise(async (resolve, reject) => {
        try {

            if(BaseController.models.hasOwnProperty(model) == false)
            {
                reject(`Model '${model}' not found`);
            }

            if(BaseController.hasOwnProperty(operation) == false)
            {
                reject(`Function '${operation}' not found`);
            }

            let modelAttrib = await BaseController.models[model].describe();

            if(queryParameters.hasOwnProperty("where"))
            {
                for(let key of Object.keys(queryParameters.where))
                {
                   
                    if(modelAttrib.hasOwnProperty(key) == false)
                    {
                        reject(`a Attribute '${key}' in model: '${model}' not found`);
                    }

                    if(typeof queryParameters.where[key] == "object")
                    {
                        for(let ops of Object.keys(queryParameters.where[key]))
                        {
                           
                            let value = queryParameters.where[key][ops];
                           
                            queryParameters.where[key] = {[Sequelize.Op[ops]] : value}
                            delete queryParameters.where[key][ops]
                        }
                    }
                    
                }

            }
            const attributes = [];
            const excludedAttributes = queryParameters.attributes.filter(e=> !Array.isArray(e) && e.startsWith("#"));
            const jsonQuery = [];
            const modelColsKeys = Object.keys(modelAttrib);
            const JSON_ATTRIB_SPLITTER = "->";
            excludedAttributes.push("*")
            for(let attrib of queryParameters.attributes)
            {
                if(typeof attrib == "string" && attrib != "*" && attributes.hasOwnProperty(attrib) == false && !attrib.includes(JSON_ATTRIB_SPLITTER) && !excludedAttributes.map(e=>e.slice(1, e.length)).includes(attrib)) 
                {
                    attributes.push(attrib);
                }
                else {
                    attrib = attrib.split(JSON_ATTRIB_SPLITTER);
                    const col = attrib[0];
                    const literal = attrib[1];
                    if(col != "*" && modelAttrib.hasOwnProperty(col) == false)
                    {
                        reject(`Attribute '${col}' in model: '${model}' not found`);
                    }
                    else {
                        if(col != "*" )
                        {
                            attributes.push([Sequelize.literal(`CAST(${col}->>'$.${literal}' AS CHAR)`), `${col}.${literal}`]);
                            jsonQuery.push(`${col}.${literal}`)
                        }
                        else {
                            
                                for(let key of modelColsKeys)
                                {
                                    if(attributes.includes(key) == false && excludedAttributes.map(e=>e.slice(1, e.length)).includes(key) == false)
                                    {
                                        attributes.push(key);
                                        jsonQuery.push(`${key}.${literal}`)
                                    }
                                }
                        }
                    }
                   
                }
            }
           
            queryParameters.jsonQuery = jsonQuery;
            if(queryParameters.attributes.length > 0)
            {
                let check = queryParameters.attributes.filter(e=> !excludedAttributes.map(e=>e.slice(1, e.length)).includes(e)).length;
    
                if(check == 0)
                {
                    queryParameters.attributes = [...modelColsKeys.filter(e=> !excludedAttributes.map(e=>e.slice(1, e.length)).includes(e)), ...attributes]
                }
                else {
                    queryParameters.attributes = [...attributes]
                }
            }
            
            queryParameters.attributes = queryParameters.attributes.filter(e=> !excludedAttributes.map(e=>e.slice(1, e.length)).includes(e)).filter(e=> !excludedAttributes.includes(e));

            if(queryParameters.attributes.length == 0 && excludedAttributes.length == 0 ){
                delete queryParameters.attributes;
            }
          
            let response = await BaseController[operation](queryParameters, model, payload);
            return resolve(response);
        } catch (error) {
            reject(error)
        }
    });
}