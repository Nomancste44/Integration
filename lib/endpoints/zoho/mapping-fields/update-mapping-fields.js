'use strict'
const  dynamo = require('../../../../bin/repo/fields-mapping-repo');
const {hooksWithPathAndBodyValidation } = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const yup = require('yup');

const updateMappingFields = async (event) => {

    try {
        const result = [];
        const {data} = event.body;
        const userId = process.env.userId;

        for (const item of data) {
            const updatedItem =  await dynamo.update(item,userId);
            result.push(updatedItem);
        }

        return response._200(result); 
    } catch (error) { return response._500(error);}
    
};

const bodySchema = yup.object().shape({
    data: yup.array().of(
        yup.object().shape({
            CombinedSortKey: yup.string().required(),
            XeroFieldId: yup.string().required(),
            XeroFieldName: yup.string().required()
        })
    ).required()
});

const pathSchema = yup.object().shape({
    moduleName: yup.string().required()
});

module.exports ={
    updateMappingFields : hooksWithPathAndBodyValidation({pathSchema, bodySchema})(updateMappingFields)
}

