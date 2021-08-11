const {getZohoRecordsFetchingUrl} = require('../../../../bin/zoho-xero-endpoints/zoho-endpoints');
const {hooksWithPathValidation} = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const {axiosInstance} = require('../../../../config/zoho-config/zoho-axios');
const { KeyValuePairs, ZohoModules } = require('../../../common/common');
const dynamo = require('../../../../bin/repo/records-fetching-repo');
const yup = require('yup');
const { tableNameList } = require('../../../../bin/tableNames');
const { v4: uuid } = require('uuid');

const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});

const fetchZohoRecords = async(event)=>{
    try
    {  
        const moduleName = event?.pathParameters?.moduleName;    
        let records = []; 
        let result;        
        let morePage = true;
        let page = 1;
        while(morePage == true)
        {
            const res = await axiosInstance.get(getZohoRecordsFetchingUrl(moduleName,page));
            page++; console.log(page);
            records.push(res.data);                     
            morePage = res.data.info.more_records;         
        }      
        switch (moduleName){
            case ZohoModules.accounts:
                result = await accountsRecords(records);
                break;
            case ZohoModules.vendors:                
                result = await vendorsRecords(records);
                break;
            case ZohoModules.contacts:
                result = await contactsRecords(records);
                break;
            case ZohoModules.products:
                result = await productsRecords(records);
                break;
            case ZohoModules.purchaseOrders:
                result = await purchaseOrdersRecords(records);
                break;
            case ZohoModules.invoices:
                result = await invoicesRecords(records);
                break;
        }      
        return response._201(result);  
    }
    catch (err) { return response._500(err)}
    
}

async function accountsRecords(records) {
    var tableName = tableNameList.tblCrmFetchedAccount;
    await dynamo.deleteAllRecords(tableName,'UserId','CrmAccountName',process.env.userId);     
    
    const resObj = []; 
    for (let record of records) {                      
        for (let aData of record.data) {      
            let item = {
                    UserId: process.env.userId,
                    CrmAccountName:aData.Account_Name,
                    CrmRecordId:aData.id,
                    Xero:{
                        XeroRecordId:aData.crmcustomisationforzohonxeroplugin__XERO_Id,
                        OrganizationId:''
                    },
                    CrmLastModifiedTime:aData.Modified_Time,
                    XeroLastModifiedTime:'',             
                    CreatedOn: KeyValuePairs.currentDate,
                    UpdatedOn: KeyValuePairs.currentDate            
                };        
            await dynamo.write(tableName,item);
            resObj.push(item);              
        }
    }
    return resObj;
}

async function vendorsRecords(records) {
    var tableName = tableNameList.tblCrmFetchedVendor;
    await dynamo.deleteAllRecords(tableName,'UserId','CrmVendorName',process.env.userId);
        
    const resObj = [];   
    for (let record of records) {     
        for (let aData of record.data) {      
            let item = {
                    UserId: process.env.userId,
                    CrmVendorName:aData.Vendor_Name,
                    CrmRecordId:aData.id,
                    Xero:{
                        XeroRecordId:aData.crmcustomisationforzohonxeroplugin__XERO_Id,
                        OrganizationId:''
                    },
                    CrmLastModifiedTime:aData.Modified_Time,
                    XeroLastModifiedTime:'',             
                    CreatedOn: KeyValuePairs.currentDate,
                    UpdatedOn: KeyValuePairs.currentDate            
                };        
            await dynamo.write(tableName,item);
            resObj.push(item);              
        }
    }
    return resObj;
}

async function contactsRecords(records){
    var tableName = tableNameList.tblCrmFetchedContact;
    await dynamo.deleteAllRecords(tableName,'UserId','Email',process.env.userId);           
    const resObj = [];
    for (let record of records) {
        console.log("In");
        for (let aData of record.data) {      
            let item = {
                UserId: process.env.userId,
                Email: aData.Email,
                CrmRecordId: aData.id,
                CrmAccountId: aData.Account_Name === null ? '' : aData.Account_Name.id,
                CrmVendorId: '',
                FirstName: aData.First_Name,
                LastName: aData.Last_Name,
                FullName: aData.Full_Name,
                IsPrimaryContact: true,
                IsIncludeInEmail: false,                             
                CrmLastModifiedTime:aData.Modified_Time,                            
                CreatedOn: KeyValuePairs.currentDate,
                UpdatedOn: KeyValuePairs.currentDate,                         
            };      
            await dynamo.write(tableName,item);
            resObj.push(item);                         
        }
    }
    return resObj;
}

async function productsRecords(records) {
    var tableName = tableNameList.tblCrmFetchedProduct;
    await dynamo.deleteAllRecords(tableName,'UserId','CrmProductName',process.env.userId);    
    const resObj = [];  
    for (let record of records) {                  
        for (let aData of record.data) {      
            let item = {
                    UserId: process.env.userId,
                    CrmProductName: aData.Product_Name,
                    CrmRecordId: aData.id,
                    CrmVendorId: '',
                    Xero:{
                        XeroRecordId:aData.crmcustomisationforzohonxeroplugin__XERO_Id,
                        OrganizationId:''
                    },
                    CrmProductCode: aData.Product_Code,
                    CrmProductTaxCode: '',
                    CrmProductStatus: '',
                    XeroSalesAccount: aData.crmcustomisationforzohonxeroplugin__Xero_Sales_Account,
                    XeroSalesAccountId: aData.crmcustomisationforzohonxeroplugin__Xero_Sales_Account_ID,
                    XeroPurchaseAccount: aData.crmcustomisationforzohonxeroplugin__Xero_Purchase_Account,
                    XeroPurchaseAccountId: aData.crmcustomisationforzohonxeroplugin__Xero_Purchase_Account_ID,
                    XeroAssetAccount: aData.crmcustomisationforzohonxeroplugin__Xero_Inventory_Asset_Account,
                    XeroAssetAccountId: aData.crmcustomisationforzohonxeroplugin__Xero_Inventory_Asset_Account_ID,
                    CrmLastModifiedTime: aData.Modified_Time,
                    XeroLastModifiedTime:'',             
                    CreatedOn: KeyValuePairs.currentDate,
                    UpdatedOn: KeyValuePairs.currentDate            
                };        
            await dynamo.write(tableName,item);
            resObj.push(item);              
        }
    }
    return resObj;
}

async function purchaseOrdersRecords(records) {
    var tableName = tableNameList.tblCrmFetchedPurchaseOrders;
    await dynamo.deleteAllRecords(tableName,'UserId','CrmFetchedPurchaseOrderId',process.env.userId);
        
    const resObj = [];       
    for (let record of records) {  
        for (let aData of record.data) {      
            let item = {
                    UserId: process.env.userId,
                    CrmFetchedPurchaseOrderId: uuid(),
                    CrmRecordId: aData.id,                
                    Xero:{
                        XeroRecordId:aData.crmcustomisationforzohonxeroplugin__XERO_Id,
                        OrganizationId:''
                    },               
                    CrmLastModifiedTime: aData.Modified_Time,
                    XeroLastModifiedTime:'',             
                    CreatedOn: KeyValuePairs.currentDate,
                    UpdatedOn: KeyValuePairs.currentDate            
                };        
            await dynamo.write(tableName,item);
            resObj.push(item);              
        }
    }
    return resObj;
}

async function invoicesRecords(records) {
    var tableName = tableNameList.tblCrmFetchedInvoice;
    await dynamo.deleteAllRecords(tableName,'UserId','CrmFetchedInvoiceId',process.env.userId);
        
    const resObj = [];       
    for (let record of records) {  
        for (const aData of record.data) {      
            let item = {
                    UserId: process.env.userId,
                    CrmFetchedInvoiceId: uuid(),
                    CrmRecordId: aData.id,                
                    Xero:{
                        XeroRecordId:aData.crmcustomisationforzohonxeroplugin__XERO_Id,
                        OrganizationId:''
                    },               
                    CrmLastModifiedTime: aData.Modified_Time,
                    XeroLastModifiedTime:'',             
                    CreatedOn: KeyValuePairs.currentDate,
                    UpdatedOn: KeyValuePairs.currentDate            
                };        
            await dynamo.write(tableName,item);
            resObj.push(item);              
        }
    }
    return resObj;
}

module.exports= {
    fetchZohoRecords : hooksWithPathValidation(pathSchema)(fetchZohoRecords)
}