const axios = require('axios').default;
const { XeroModules } = require("../../common/common");
const response = require('../../common/endpoints-responses');

const getRecords = async(url,data)=>{             
    let records;    
    let options ={
        headers: {
            'xero-tenant-id': 'ee04b645-4e35-42c3-b147-651d648f1e95',
            'Authorization': '',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }       
    };   
    
    records = await axios.put(url,data,options);    
    return records.data;
}

const insertXeroRecords = async(event)=>{
    try
    {  
        const moduleName = event?.pathParameters?.moduleName;            
        let records = [],result;                    
        switch (moduleName){            
            case XeroModules.accounts:              
            for(var i=0; i<50; i++)                
            {
                data={
                    Code: await getRandomString(8),
                    Name: await getRandomString(8),
                    Type: "SALES"
                };
                result = await getRecords('https://api.xero.com/api.xro/2.0/Accounts',data);                  
                records.push(result);
            }                
            break;             
            case XeroModules.contacts:
                for(var i=0;i<50;i++)
                {
                    data={
                        
                        Name: await getRandomString(8),
                        FirstName: await getRandomString(8),
                        LastName: await getRandomString(8),
                        EmailAddress: await getRandomString(8)+"@oscillosoft.com.au",
                        ContactPersons: [
                            {
                            FirstName: await getRandomString(8),
                            LastName: await getRandomString(8),
                            EmailAddress: await getRandomString(8)+"@oscillosoft.com.au",
                            IncludeInEmails: true
                            }
                        ]                          
                    };
                    result = await getRecords('https://api.xero.com/api.xro/2.0/Contacts',data);
                    records.push(result);
                }                                              
                break;
            case XeroModules.items:
                for(var i=0;i<50;i++)
                {
                    data={
                        Code: await getRandomString(8),
                        Description: "Sell me",
                        PurchaseDescription: "Purchase me",
                        PurchaseDetails: {
                          UnitPrice: 75.5555,
                          COGSAccountCode: "300",
                          TaxType: "TAX001"
                        },
                        SalesDetails: {
                          UnitPrice: 1020.5555,
                          AccountCode: "260",
                          TaxType: "TAX001"
                        },
                        Name: "Full Tracked Item",
                        InventoryAssetAccountCode: "630",
                        IsSold: true,
                        IsPurchased: true
                    };
                    result = await getRecords('https://api.xero.com/api.xro/2.0/Items',data);
                    records.push(result);
                }                
                break;            
        }  
        return response._201(records);    
        
    }
    catch (err) { return response._500(err)}    
}

const getRandomString= async(length)=> {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }    
    return result;
}

module.exports= {   
    insertXeroRecords
}
