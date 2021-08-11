'use strict'
const {getZohoFieldMappingUrl} = require('../../../../bin/zoho-xero-endpoints/zoho-endpoints');
const {hooksWithPathValidation} = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const {axiosInstance} = require('../../../../config/zoho-config/zoho-axios');
const { KeyValuePairs } = require('../../../common/common');
const  dynamo = require('../../../../bin/repo/fields-mapping-repo');
const yup = require('yup');
const {getXeroMappingFieldInfoByCrmFieldApiName} = require('../../../common/xero-default-mappings');

async function storeMappingFields({moduleResponse, moduleName, isFromDefaultMapping = false}) {    
    for (const aLayout of moduleResponse.layouts) {
        for (const aSection of aLayout.sections) {
            for (const aField of aSection.fields) {
                let xeroDefaultMapping = isFromDefaultMapping? getXeroMappingFieldInfoByCrmFieldApiName({moduleName, crmFieldApiName: aField.api_name}) : undefined;
                let item = {
                    UserId: process.env.userId,
                    CombinedSortKey: `${moduleName}#${aField.api_name}`,
                    CModuleName: moduleName,
                    CSectionName: aSection.display_label,
                    CSectionSeqNo: aSection.sequence_number,
                    CFieldApiName: aField.api_name,
                    CFieldLabel: aField.field_label,
                    CFieldSeqNumber: aField.sequence_number,
                    CFieldId: aField.id,
                    CRequired: (aField.api_name == "crmcustomisationforzohonxeroplugin__Add_to_XERO" || aField.api_name == "crmcustomisationforzohonxeroplugin__XERO_Id") ? true : aField.required,
                    CCreatedOn: KeyValuePairs.currentDate,
                    CUpdatedOn: KeyValuePairs.currentDate,
                    XeroFieldId: xeroDefaultMapping ? xeroDefaultMapping.fieldId : '',
                    XeroFieldName: xeroDefaultMapping ? xeroDefaultMapping.fieldName : '',
                };
                await dynamo.write(item);                          
            }
        }
    }
    const resObj = await dynamo.get(process.env.userId, moduleName);
    return resObj.Items;
    
}

const getZohoMappingFields = async (moduleName)=> {
    const moduleResponse = await axiosInstance.get(getZohoFieldMappingUrl(moduleName))
    return moduleResponse.data;
}

const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});



const fetchZohoMappingFields = async(event)=>{
    try
    {   const moduleName = event?.pathParameters?.moduleName;    
        let moduleResponse = await getZohoMappingFields(moduleName);    
        const result = await storeMappingFields({moduleResponse, moduleName});
        return response._201(result);  
    }
    catch (err) { return response._500(err)}
    
}

module.exports= {
    fetchZohoMappingFields : hooksWithPathValidation(pathSchema)(fetchZohoMappingFields),
    getZohoMappingFields,
    storeMappingFields
}





