const axios = require('axios').default;
const { XeroModules } = require("../../common/common");
const response = require('../../common/endpoints-responses');

const getRecords = async(url,data)=>{             
    let records;    
    let options ={
        headers: {
            'xero-tenant-id': 'ee04b645-4e35-42c3-b147-651d648f1e95',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjFDQUY4RTY2NzcyRDZEQzAyOEQ2NzI2RkQwMjYxNTgxNTcwRUZDMTkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJISy1PWm5jdGJjQW8xbkp2MENZVmdWY09fQmsifQ.eyJuYmYiOjE2MjU0NTc4ODksImV4cCI6MTYyNTQ1OTY4OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS54ZXJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHkueGVyby5jb20vcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiMURGMzMzNzNGMkIxNDEwNUJBN0RCNUQzQ0JCQUM4NjEiLCJzdWIiOiI5NTU0YjI3YzI0MmE1NjBkYTg2ZmE2N2E3MGQ5YmUxYiIsImF1dGhfdGltZSI6MTYyNDU5NTExNywieGVyb191c2VyaWQiOiI5MTc2ZGEzMy00Y2FiLTQ2ZTItYjY2OC1kMzRlNzFiODliNTgiLCJnbG9iYWxfc2Vzc2lvbl9pZCI6IjA3ZjY4NTQ1YWVkOTRmYzE4ODI0MGE0MmUwM2E5NWE2IiwianRpIjoiNTBmMDFhZjY4ZjdkM2M0ODk4YjI3MzJhZTAxZmNkMTkiLCJhdXRoZW50aWNhdGlvbl9ldmVudF9pZCI6IjRiMGI0MzljLTEyNjQtNDBhYi05ZTMyLWVjNDFmZGZmMDE2MiIsInNjb3BlIjpbImVtYWlsIiwicHJvZmlsZSIsIm9wZW5pZCIsImFjY291bnRpbmcuc2V0dGluZ3MiLCJhY2NvdW50aW5nLmF0dGFjaG1lbnRzIiwiYWNjb3VudGluZy50cmFuc2FjdGlvbnMiLCJhY2NvdW50aW5nLmNvbnRhY3RzIiwib2ZmbGluZV9hY2Nlc3MiXX0.v_ZLXT1oy4Bd142RD_YVXxCQaaeyMJ-PJuBju8_NY2goAbMbx1jaqp3NXYxODR7uVEOSv6HKPh0-Rsd9Q9ohqP4yEfS23fVHBTAJNBxy7gm5HUbF21ZbQnUBlkXK2wrZMB1gDFbtugEfL91i1_CGg9jcSEeGKhIPDafBOCsML-98KMutbFC8suE2tRgNyE94KEE95gLCCPDdLdyvGt_TeJpvySvsanLUclFe43zgUPILZ5NbEVQTBdTH-H04RpW8JV_OUGxMPQO0biWIZtqo-kI1XMT7EK6GRVB2bHPT4dQuiapA1cM0nsWsMSY1LCre8MHdbJICtQvft-sD7FbjrA',
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