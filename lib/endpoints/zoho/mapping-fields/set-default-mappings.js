'use strict'
const {getZohoMappingFields,storeMappingFields} = require('./fetch-mapping-fields');
const response = require('../../../common/endpoints-responses');
const { hooks } = require('../../../common/hooks');
const {getZohoToXeroDefaultMappingStatus} = require('../../../common/xero-default-mappings');
const  dynamoDB = require('../../../../bin/repo/status-mapping-repo');
const { ZohoModules } = require('../../../common/common');


const setDefaultMappings = async(event)=>{
    try
    {        
        const allModules=[];
        for(const key in ZohoModules)
        {
            allModules.push(ZohoModules[key]);
        }        
        const resObj = [];
        for (const aModule of allModules) {
            let moduleResponse = await getZohoMappingFields(aModule);
            let result = await storeMappingFields({moduleResponse, moduleName: aModule, isFromDefaultMapping: true});
            resObj.push(result);
        }
        await insertDefaultStatus();
        return response._200(resObj);
    }
    catch(error){ return response._500(error); }
   
};

async function insertDefaultStatus(){   
    let retObj = [] ;
    const modules = ['Invoices','Purchase_Orders'];
    let zohoToXeroDefaultMappingStatus = getZohoToXeroDefaultMappingStatus();
    for (const aModule of modules) {
        for(const key in zohoToXeroDefaultMappingStatus)
        {
            let item={
                UserId: process.env.UserId,
                CombinedSortKey: `${aModule}#${key}`,
                CrmStatus: key,
                XeroStatus: zohoToXeroDefaultMappingStatus[key],
                ModuleName: aModule
            };        
            await dynamoDB.write(item);        
            retObj.push(item);
        }
    }
    
    return retObj;
};

module.exports = {
    setDefaultMappings: hooks(setDefaultMappings)
}