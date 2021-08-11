const { hooksWithPathValidation } = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const yup = require('yup');
const { XeroModules } = require("../../../common/common");
const {axiosInstance} = require('../../../../config/xero-config/xero-axios')
const { tableNameList } = require('../../../../bin/tableNames');
const dynamo = require('../../../../bin/repo/records-fetching-repo');
const { KeyValuePairs, ZohoModules } = require('../../../common/common');

const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});

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

const fetchXeroRecords = async(event)=>{
    try
    {  
        const moduleName = event?.pathParameters?.moduleName;
        const tenantId = event.headers[KeyValuePairs.xeroTenantIdHeader];            
        let records,result;            

        switch (moduleName){
            case XeroModules.accounts:                
                records = await getRecords('https://api.xero.com/api.xro/2.0/Accounts',tenantId);                
                result = await accountsRecords(records);                
                break;            
            case XeroModules.contacts:
                records = await getRecords('https://api.xero.com/api.xro/2.0/Contacts',tenantId);     
                result = await contactsRecords(records);
                break;
            case XeroModules.brandingThemes:
                records = await getRecords('https://api.xero.com/api.xro/2.0/BrandingThemes',tenantId);                   
                result = await brandingThemesRecords(records);
                break;
            case XeroModules.items:
                records = await getRecords('https://api.xero.com/api.xro/2.0/Items',tenantId);     
                result = await itemsRecords(records);
                break;            
        }      
        return response._201(result);  
    }
    catch (err) { return response._500(err)}    
}

async function accountsRecords(records) {    
    var tableName = tableNameList.tblXeroChartOfAccounts;
    await dynamo.deleteAllRecords(tableName,'UserId','XeroChartOfAccountId',process.env.userId);         
    
    const resObj = [];                 
    for(const aAccount of records.Accounts){
        let item = {
            UserId: process.env.userId,
            XeroChartOfAccountId:aAccount.AccountID,                
            ChartOfAccountClass: aAccount.Class,
            ChartOfAccountType: aAccount.Type,
            ChartOfAccountName: aAccount.Name,
            ChartOfAccountCode: aAccount.Code,
            ChartOfAccountTax: aAccount.TaxType,
            ChartOfAccountStatus: aAccount.Status,
            CreatedOn: KeyValuePairs.currentDate,
            UpdatedOn: KeyValuePairs.currentDate,
            OrganizationId: ''                          
        };       
        await dynamo.write(tableName,item);
        resObj.push(item);
    }                  
    return resObj;
}

async function contactsRecords(records) {
    var tableName = tableNameList.tblXeroContacts;
    await dynamo.deleteAllRecords(tableName,'UserId','XeroContactId',process.env.userId);     
    
    const resObj = [];  var FName,LName;         
    for(const aContact of records.Contacts){       
        let item = {
            UserId: process.env.userId,
            XeroContactId: aContact.ContactID,
            CrmRecordId: '',
            ContactName: aContact.Name,
            FirstName: aContact.hasOwnProperty("FirstName") ? aContact.FirstName : '',
            LastName: aContact.hasOwnProperty("LastName") ? aContact.LastName : '',
            Email: aContact.EmailAddress,
            XeroLastModifiedTime:aContact.UpdatedDateUTC,
            CreatedOn: KeyValuePairs.currentDate,
            UpdatedOn: KeyValuePairs.currentDate,
            OrganizationId: ''      
        };        
        await dynamo.write(tableName,item);
        resObj.push(item);
    }               
    
    return resObj;
}

async function brandingThemesRecords(records) {
    var tableName = tableNameList.tblXeroBrandingThemes;
    await dynamo.deleteAllRecords(tableName,'UserId','XeroBrandingThemeId',process.env.userId);     
    
    const resObj = [];      
    for(const aBrandingTheme of records.BrandingThemes){
        let item = {
            UserId: process.env.userId,
            XeroBrandingThemeId: aBrandingTheme.BrandingThemeID,
            BrandingThemeName: aBrandingTheme.Name,
            BrandingThemeSortOrder: aBrandingTheme.SortOrder,                
            CreatedOn: KeyValuePairs.currentDate,
            UpdatedOn: KeyValuePairs.currentDate,
            OrganizationId: ''      
        };        
        await dynamo.write(tableName,item);
        resObj.push(item);
    }              
    return resObj;
}

async function itemsRecords(records) {
    var tableName = tableNameList.tblXeroItems;
    await dynamo.deleteAllRecords(tableName,'UserId','XeroItemId',process.env.userId);     
    
    const resObj = [];         
    for(const aItem of records.Items){
        let item = {
            UserId: process.env.userId,
            XeroItemId: aItem.ItemID,
            CrmRecordId: '',
            ItemName: aItem.Name,
            ItemCode:aItem.Code,
            XeroLastModifiedTime: aItem.UpdatedDateUTC,                
            CreatedOn: KeyValuePairs.currentDate,
            UpdatedOn: KeyValuePairs.currentDate,
            OrganizationId: ''      
        };        
        await dynamo.write(tableName,item);
        resObj.push(item);
    }               
    
    return resObj;
}

module.exports= {    
    fetchXeroRecords : hooksWithPathValidation(pathSchema)(fetchXeroRecords)
}