const _ = require('underscore');
const response = require('../../../common/endpoints-responses');
const dynamo = require('../../../../bin/repo/tax-mapping-repo');
const {hooks} = require('../../../common/hooks');
const { tableNameList } = require('../../../../bin/tableNames');

const getMappingTax= async(event)=>{   
    try 
    {
        const userId = process.env.userId ;

        const xeroTableName = tableNameList.tblCrmWithXeroTaxMapping;     
        const xeroProjectionExpression = 'CombinedSortKey,XeroTaxCodeName,XeroTaxCodeType,Amount,ActualValue';
        const resXero = await dynamo.get(xeroTableName,userId,xeroProjectionExpression);
        console.log(resXero);
        const crmTableName = tableNameList.tblCrmTaxRecords;    
        const crmProjectionExpression = 'DisplayValue,ActualValue'; 
        const resCrm = await dynamo.get(crmTableName,userId,crmProjectionExpression);
        console.log(resCrm);
        var resObj = {};
        resObj.Xero = resXero.Items;
        resObj.Crm = resCrm.Items;

        if(!_.isEmpty(resXero.Items)) 
            return response._200(resObj);
        return response._404(res);
            
    } 
    catch (err) { return response._500(err)}
}

module.exports = {
    getMappingTax: hooks(getMappingTax)
}

