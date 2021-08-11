'use strict'
const  dynamo = require('../../../../bin/repo/tax-mapping-repo');
const {hooksWithBodyValidation } = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const yup = require('yup');
const { tableNameList } = require('../../../../bin/tableNames');

const updateMappingTax = async (event) => {

    try {
        const result = [];
        const {data} = event.body;
        const userId = process.env.userId;        
        const tableName = tableNameList.tblCrmWithXeroTaxMapping;
        
        for (const item of data) {
            const updatedItem =  await dynamo.update(tableName,item,userId);            
            result.push(updatedItem);
        }
        return response._200(result); 
    } catch (error) { return response._500(error);}
    
};

const bodySchema = yup.object().shape({
    data: yup.array().of(
        yup.object().shape({
            CombinedSortKey: yup.string().required(),                        
            ActualValue: yup.string().required()                        
        })
    ).required()
});

module.exports ={
    updateMappingTax : hooksWithBodyValidation(bodySchema)(updateMappingTax)
}

