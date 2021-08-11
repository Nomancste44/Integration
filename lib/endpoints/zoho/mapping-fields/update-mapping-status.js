'use strict'
const  dynamoDB = require('../../../../bin/repo/status-mapping-repo');
const {hooksWithBodyValidation } = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const yup = require('yup');

const updateMappingStatus = async (event) => {

    try 
    {
        const result = [];
        const {data} = event.body;
        const userId = process.env.userId;        

        for (const item of data) {
            const updatedItem =  await dynamoDB.update(item,userId);
            console.log(item);
            result.push(updatedItem);
        }
        return response._200(result); 
    } 
    catch (error) { return response._500(error);}
    
};

const bodySchema = yup.object().shape({
    data: yup.array().of(
        yup.object().shape({
            CombinedSortKey: yup.string().required(),            
            XeroStatus: yup.string().required()            
        })
    ).required()
});

module.exports ={
    updateMappingStatus : hooksWithBodyValidation(bodySchema)(updateMappingStatus)
}

