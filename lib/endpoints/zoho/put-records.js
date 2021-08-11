const {postZohoRecordsFetchingUrl} = require('../../../bin/zoho-xero-endpoints/zoho-endpoints');
const response = require('../../common/endpoints-responses');
const {axiosInstance} = require('../../../config/zoho-config/zoho-axios');
const { ZohoModules } = require("../../common/common");

const postZohoRecords = async (moduleName,item)=> {     
    let moduleResponse;        
    moduleResponse = await axiosInstance.post(postZohoRecordsFetchingUrl(moduleName),item);
    return moduleResponse.data;
}
const insertZohoRecords = async(event)=>{
    try
    {   let item,moduleResponse;
        const moduleName = event?.pathParameters?.moduleName;
        switch (moduleName){            
            case ZohoModules.accounts:                
                item = {
                    data:await accountItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
            case ZohoModules.contacts:                
                item = {
                    data:await contactItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
            case ZohoModules.vendors:                
                item = {
                    data:await vendorItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
            case ZohoModules.products:                
                item = {
                    data:await productItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
            case ZohoModules.invoices:                
                item = {
                    data:await invoiceItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
            case ZohoModules.purchaseOrders:                
                item = {
                    data:await purchaseOrderItem()
                };
                moduleResponse = await postZohoRecords(moduleName,item);
                break;
        }                 
        return response._201(moduleResponse);  
    }
    catch (err) { return response._500(err)}
    
}
const accountItem = async() =>{
    var item = [];
    for(i=0;i<100;i++)
    {
        item.push({
            
            Account_Name: await getRandomString(8),
            Website: 'www.'+ await getRandomString(5) + '.com',
            Employees: 150 
              
        });
    }    
    return item;   
}
const contactItem = async() =>{
    var item = [];
    for(i=0;i<100;i++)
    {
        item.push({            
            Last_Name: await getRandomString(8),
            Email: await getRandomString(8) +'@oscillosoft.com.au'               
        });
    }    
    return item;   
}
const vendorItem = async() =>{
    var item = [];
    for(i=0;i<100;i++)
    {
        item.push({            
            Vendor_Name: await getRandomString(8),
            Email:  await getRandomString(8) +'@oscillosoft.com.au',
            Website: 'www.'+ await getRandomString(5) + '.com',
            Phone: "8885555983"              
        });
    }    
    return item;   
}
const productItem = async() =>{
    var item = [];
    for(i=0;i<100;i++)
    {
        item.push({            
            Product_Code: await getRandomString(8),
            Product_Name: await getRandomString(8),
            Product_Category: await getRandomString(8),
            Reorder_Level: 17,
            Qty_Ordered: 6,
            Qty_in_Stock: 50             
        });
    }    
    return item;   
}
const invoiceItem = async() =>{
    var item = [];
    for(i=0;i<1;i++)
    {
        item.push({              
            "$currency_symbol": "AU$",
            "Tax": 29,
            "Add_to_SaaSu": true,
            "$state": "save",
            "$process_flow": false,
            "Exchange_Rate": 1,
            "Currency": "AUD",
            "$approved": true,
            "Status": "Created",
            "Grand_Total": 319,
            "Adjustment": 0,
            "$editable": true,
            "Product_Details": [
                {
                    "product": {
                        "Product_Code": "yQfPnASL",                       
                        "name": "ppIiEpsp",
                        "id": "4902008000000486100"
                    },
                    "quantity": 1,
                    "Discount": 0,
                    "total_after_discount": 290,
                    "net_total": 290,
                    "Tax": 0,
                    "list_price": 290,
                    "unit_price": 290,
                    "quantity_in_stock": -2,
                    "total": 290,
                    "product_description": "",
                    "line_tax": []
                }
            ],
            "Add_to_MYOB": true,
            "Invoice_Date": new Date().toISOString().slice(0, 10),
            "Terms_and_Conditions": "this is the terms and conditions of this company.",
            "Sub_Total": 290,
            "Subject": await getRandomString(8),
            "$orchestration": false,
            "$approval_state": "created"            
        });
    }    
    return item;   
}
const purchaseOrderItem = async() =>{
    var item = [];
    for(i=0;i<1;i++)
    {
        item.push({              
            "Vendor_Name": {
                "id": "4902008000000476106"
            },
            "Due_Date": new Date().toISOString().slice(0, 10),
            "Product_Details": [
               {
                    "product": {
                        "Product_Code": "yQfPnASL",                       
                        "name": "ppIiEpsp",
                        "id": "4902008000000486100"
                    },
                    "quantity": 5,
                    "Discount": 0,
                    "total_after_discount": 2500,
                    "net_total": 2500,
                    "book": null,
                    "Tax": 0,
                    "list_price": 50,
                    "unit_price": 5000,
                    "quantity_in_stock": 30,
                    "total": 2500,
                    "product_description": "",
                    "line_tax": [
                       {
                            "percentage": 0,
                            "name": "Vat",
                            "value": 0
                        }
                    ]
                }
            ],
            "Subject":await getRandomString(8),
            "Tracking_Number": "1534"          
        });
    }    
    return item;   
}
const getRandomString= async(length)=> {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }    
    return result;
}


module.exports= {
    insertZohoRecords
}