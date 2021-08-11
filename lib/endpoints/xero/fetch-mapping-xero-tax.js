const { KeyValuePairs } = require('../../common/common');
const {axiosInstance} = require('../../../config/xero-config/xero-axios')
const { tableNameList } = require('../../../bin/tableNames');
const dynamo = require('../../../bin/repo/tax-mapping-repo');
const { hooks } = require('../../common/hooks');
const response = require('../../common/endpoints-responses');
const { xeroTaxMappingUrl } = require('../../../bin/zoho-xero-endpoints/zoho-endpoints');

const getRecords = async(url,tenantId)=>{    
    let records;    
    let options ={
        headers: {
            [KeyValuePairs.xeroTenantIdHeader]: tenantId
        }       
    };
    
    records = await axiosInstance.get(url,options);    
    return records.data;
}

const fetchXeroTaxRecords = async(event)=>{
    try
    {             
        const tenantId = event.headers[KeyValuePairs.xeroTenantIdHeader];    
        records = await getRecords(xeroTaxMappingUrl(),tenantId);
        const tableName = tableNameList.tblCrmWithXeroTaxMapping;
        
        for(const aTaxRate of records.TaxRates){
            for(const aTaxComponent of aTaxRate.TaxComponents){
                let item = {
                    UserId: process.env.userId,
                    CombinedSortKey:`${process.env.userId}#${aTaxRate.Name}`,
                    XeroTaxCodeName: aTaxRate.Name,
                    XeroTaxCodeType: aTaxRate.TaxType,
                    Amount: aTaxComponent.Rate,                     
                    ActualValue: ''                                       
                };       
                await dynamo.write(tableName,item);                
            }            
        }

        const projectionExpression = 'CombinedSortKey,XeroTaxCodeName,XeroTaxCodeType,Amount,ActualValue';
        let res = await dynamo.get(tableName,process.env.userId,projectionExpression);
        return res.Items;  
    } 
    catch (err) { return response._500(err)}            
}

module.exports= {    
    fetchXeroTaxRecords : hooks(fetchXeroTaxRecords)
}
