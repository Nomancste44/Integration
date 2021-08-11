const {getZohoTaxMappingUrl} = require('../../../../bin/zoho-xero-endpoints/zoho-endpoints');
const {hooks} = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const {axiosInstance} = require('../../../../config/zoho-config/zoho-axios');
const  dynamo = require('../../../../bin/repo/tax-mapping-repo');
const { tableNameList } = require('../../../../bin/tableNames');


const getZohoMappingTax = async()=> {
    const res = await axiosInstance.get(getZohoTaxMappingUrl());    
    return res.data;
}

const fetchZohoMappingTax = async(event)=>{
    try
    {    
        let resObj=[];
        const tableName = tableNameList.tblCrmTaxRecords;
        let taxRecords = await getZohoMappingTax();                     
        let res = taxRecords.fields.find(o => o.api_name === 'Tax').pick_list_values;

        for(const obj of res){
            let item={
                UserId :process.env.userId,
                CombinedSortKey:`${process.env.userId}#${obj.display_value}`,
                DisplayValue : obj.display_value,
                ActualValue : obj.actual_value
            }
            await dynamo.write(tableName,item);
            resObj.push(item);
        }
        resObj = resObj.map((ResObj)=>{
            return {
                DisplayValue: ResObj.DisplayValue,
                ActualValue: ResObj.ActualValue                
            }
        });
        return resObj;
    }
    catch (err) { return response._500(err)}
    
}
module.exports= {
    fetchZohoMappingTax : hooks(fetchZohoMappingTax),    
}