'use strict'
const zohoToXeroDefaultMappingFields = {
    Accounts: {
        Account_Name: 'Name',
        Phone: 'Phones$PhoneNumber@PhoneType*DEFAULT',
        Phone_Country_Code: 'Phones$PhoneCountryCode@PhoneType*DEFAULT',
        Phone_Area_Code: 'Phones$PhoneAreaCode@PhoneType*DEFAULT',
        Website: 'Website',
        Fax_Country_Code: 'Phones$PhoneCountryCode@PhoneType*FAX',
        Fax: 'Phones$PhoneNumber@PhoneType*FAX',
        Fax_Area_Code: 'Phones$PhoneAreaCode@PhoneType*FAX',
        Skype: 'SkypeUserName',
        Billing_Street: 'Addresses$AddressLine1@AddressType*POBOX',
        Shipping_Street: 'Addresses$AddressLine1@AddressType*STREET',
        Billing_City: 'Addresses$City@AddressType*POBOX',
        Shipping_City: 'Addresses$City@AddressType*STREET',
        Billing_State: 'Addresses$Region@AddressType*POBOX',
        Shipping_State: 'Addresses$Region@AddressType*STREET',
        Billing_Code: 'Addresses$PostalCode@AddressType*POBOX',
        Shipping_Code: 'Addresses$PostalCode@AddressType*STREET',
        Billing_Country: 'Addresses$Country@AddressType*POBOX',
        Shipping_Country: 'Addresses$Country@AddressType*STREET',
        crmcustomisationforzohonxeroplugin__Default_Sales_Account: 'Discount',
        crmcustomisationforzohonxeroplugin__Sales_Discount: 'PaymentTerms$Bills&Day',
        crmcustomisationforzohonxeroplugin__Invoices_Due_Date_Day: 'PaymentTerms$Bills&Type',
        //crmcustomisationforzohonxeroplugin__Add_to_XERO: '',
        crmcustomisationforzohonxeroplugin__XERO_Id: 'ContactID',
        //crmcustomisationforzohonxeroplugin__Xero_Contact_URL: 'RecordUrl'
    },
    Vendors: {
        Vendor_Name: 'Name',
        Phone: 'Phones$PhoneNumber@PhoneType*DEFAULT',
        Phone_Country_Code: 'Phones$PhoneCountryCode@PhoneType*DEFAULT',
        Phone_Area_Code: 'Phones$PhoneAreaCode@PhoneType*DEFAULT',
        Email: 'EmailAddress',
        Website: 'Website',	
        Street: 'Addresses$AddressLine1@AddressType*POBOX',
        City: 'Addresses$City@AddressType*POBOX',
        State: 'Addresses$Region@AddressType*POBOX',
        Zip_Code: 'Addresses$PostalCode@AddressType*POBOX',
        Country: 'Addresses$Country@AddressType*POBOX',	
        crmcustomisationforzohonxeroplugin__Default_Purchase_Account: 'PurchasesDefaultAccountCode',
        crmcustomisationforzohonxeroplugin__Bills_Due_Date_Day: 'PaymentTerms$Bills&Day',
        crmcustomisationforzohonxeroplugin__Bills_Due_Date_Frequency: 'PaymentTerms$Bills&Type',	
        //crmcustomisationforzohonxeroplugin__Add_to_XERO: '',
        crmcustomisationforzohonxeroplugin__XERO_Id: 'ContactID',
        //crmcustomisationforzohonxeroplugin__Xero_Contact_URL: 'RecordUrl'
    },
    Products :{
        Product_Name: 'Name',
        Product_Code: 'Code',	
        Unit_Price: 'SalesDetails$UnitPrice',
        crmcustomisationforzohonxeroplugin__Buying_Price: 'PurchaseDetails$UnitPrice',
        Taxable: 'Taxable',
        Tax: 'TaxType',
        Qty_in_Stock: 'QuantityOnHand',	
        crmcustomisationforzohonxeroplugin__Xero_Sales_Account: 'SalesDetails$AccountCode',
        crmcustomisationforzohonxeroplugin__Xero_Sales_Tax_Rate: 'SalesDetails$TaxType',
        crmcustomisationforzohonxeroplugin__Xero_Purchase_Account: 'PurchaseDetails$COGSAccountCode',
        crmcustomisationforzohonxeroplugin__Xero_Purchase_Tax_Rate: 'PurchaseDetails$TaxType',
        crmcustomisationforzohonxeroplugin__Xero_Inventory_Asset_Account: 'InventoryAssetAccountCode',	
        //crmcustomisationforzohonxeroplugin__Add_to_XERO	: '',
        crmcustomisationforzohonxeroplugin__XERO_Id: 'ItemID',
        //crmcustomisationforzohonxeroplugin__Xero_Item_URL: 'RecordUrl'
    },
    Purchase_Orders:{
        Due_Date: 'DueDate',
        Status: 'Status',
        Vendor_Name: 'Contact$ContactID',
        Subject: 'Reference',
        Currency: 'CurrencyCode',
        PO_Date: 'Date',
        Product_Details: 'LineItems',
        //crmcustomisationforzohonxeroplugin__Add_to_XERO: '',        
        crmcustomisationforzohonxeroplugin__XERO_Id:'InvoiceID',
        //crmcustomisationforzohonxeroplugin__Xero_Bill_URL:'RecordUrl',
        crmcustomisationforzohonxeroplugin__Paid_Amount:'AmountPaid',
        crmcustomisationforzohonxeroplugin__Owed_Amount:'AmountDue'
    },
    Invoices:{
        crmcustomisationforzohonxeroplugin__Invoice_No: 'InvoiceNumber', 
        Subject: 'Reference',
        Invoice_Date: 'Date',
        Account_Name: 'Contact$ContactID',
        Due_Date: 'DueDate',
        Status: 'Status',
        Currency: 'CurrencyCode',
        //crmcustomisationforzohonxeroplugin__Add_to_XERO: '',
        crmcustomisationforzohonxeroplugin__XERO_Id: 'InvoiceID',
        //crmcustomisationforzohonxeroplugin__Xero_Invoice_Url: 'RecordUrl',
        Branding_Theme: 'BrandingThemeID',
        crmcustomisationforzohonxeroplugin__Paid_Amount: 'AmountPaid',
        crmcustomisationforzohonxeroplugin__Owed_Amount: 'AmountDue',
        Product_Details: 'LineItems'    
    }

};

const xeroMappingsInfo = {
    Accounts :{
        'ContactID': {fieldId:'Accounts#ContactID', fieldName:'ContactID',fieldLabel:'Contact ID', isRequired: true},
        'Name': {fieldId:'Accounts#Name', fieldName:'Name',fieldLabel:'Name', isRequired: true},
        'EmailAddress': {fieldId:'Accounts#EmailAddress', fieldName:'EmailAddress',fieldLabel:'Email Address', isRequired: true},
        'ContactNumber': {fieldId:'Accounts#ContactNumber', fieldName:'ContactNumber',fieldLabel:'Contact Number', isRequired: true},
        'AccountNumber': {fieldId:'Accounts#AccountNumber', fieldName:'AccountNumber',fieldLabel:'Account Number', isRequired: true},
        'SkypeUserName': {fieldId:'Accounts#SkypeUserName', fieldName:'SkypeUserName',fieldLabel:'Skype User Name', isRequired: true},
        'DefaultCurrency': {fieldId:'Accounts#DefaultCurrency', fieldName:'DefaultCurrency',fieldLabel:'Default Currency', isRequired: true},
        'Addresses$AddressLine1@AddressType*POBOX': {fieldId:'Accounts#Addresses$AddressLine1@AddressType*POBOX', fieldName:'Addresses$AddressLine1@AddressType*POBOX',fieldLabel:'Postal Address Line1', isRequired: true},
        'Addresses$AddressLine1@AddressType*STREET': {fieldId:'Accounts#Addresses$AddressLine1@AddressType*STREET', fieldName:'Addresses$AddressLine1@AddressType*STREET',fieldLabel:'Physical Address Line 1', isRequired: true},
        'Addresses$City@AddressType*POBOX': {fieldId:'Accounts#Addresses$City@AddressType*POBOX', fieldName:'Addresses$City@AddressType*POBOX',fieldLabel:'Postal City', isRequired: true},
        'Addresses$City@AddressType*STREET': {fieldId:'Accounts#Addresses$City@AddressType*STREET', fieldName:'Addresses$City@AddressType*STREET',fieldLabel:'Physical City', isRequired: true},
        'Addresses$Region@AddressType*POBOX': {fieldId:'Accounts#Addresses$Region@AddressType*POBOX', fieldName:'Addresses$Region@AddressType*POBOX',fieldLabel:'Postal Region', isRequired: true},
        'Addresses$Region@AddressType*STREET': {fieldId:'Accounts#Addresses$Region@AddressType*STREET', fieldName:'Addresses$Region@AddressType*STREET',fieldLabel:'Physical Region', isRequired: true},
        'Addresses$PostalCode@AddressType*POBOX': {fieldId:'Accounts#Addresses$PostalCode@AddressType*POBOX', fieldName:'Addresses$PostalCode@AddressType*POBOX',fieldLabel:'Postal Code', isRequired: true},
        'Addresses$PostalCode@AddressType*STREET': {fieldId:'Accounts#Addresses$PostalCode@AddressType*STREET', fieldName:'Addresses$PostalCode@AddressType*STREET',fieldLabel:'Physical Postal Code', isRequired: true},        
        'Addresses$Country@AddressType*POBOX': {fieldId:'Accounts#Addresses$Country@AddressType*POBOX', fieldName:'Addresses$Country@AddressType*POBOX',fieldLabel:'Postal Country', isRequired: true}, 
        'Addresses$Country@AddressType*STREET': {fieldId:'Accounts#Addresses$Country@AddressType*STREET', fieldName:'Addresses$Country@AddressType*STREET',fieldLabel:'Physical Country', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*DEFAULT', fieldName:'Phones$PhoneCountryCode@PhoneType*DEFAULT',fieldLabel:'Telephone Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*DEFAULT', fieldName:'Phones$PhoneAreaCode@PhoneType*DEFAULT',fieldLabel:'Telephone Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*DEFAULT', fieldName:'Phones$PhoneNumber@PhoneType*DEFAULT',fieldLabel:'Telephone', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*MOBILE', fieldName:'Phones$PhoneCountryCode@PhoneType*MOBILE',fieldLabel:'Mobile Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*MOBILE', fieldName:'Phones$PhoneAreaCode@PhoneType*MOBILE',fieldLabel:'Mobile Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*MOBILE', fieldName:'Phones$PhoneNumber@PhoneType*MOBILE',fieldLabel:'Mobile', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*FAX', fieldName:'Phones$PhoneCountryCode@PhoneType*FAX',fieldLabel:'Fax Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*FAX', fieldName:'Phones$PhoneAreaCode@PhoneType*FAX',fieldLabel:'Fax Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*FAX', fieldName:'Phones$PhoneNumber@PhoneType*FAX',fieldLabel:'Fax', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*DDI', fieldName:'Phones$PhoneCountryCode@PhoneType*DDI',fieldLabel:'Direct Dial Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*DDI', fieldName:'Phones$PhoneAreaCode@PhoneType*DDI',fieldLabel:'Direct Dial Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*DDI', fieldName:'Phones$PhoneNumber@PhoneType*DDI',fieldLabel:'Direct Dial', isRequired: true}, 
        'BatchPayments$BankAccountNumber': {fieldId:'Accounts#BatchPayments$BankAccountNumber', fieldName:'BatchPayments$BankAccountNumber',fieldLabel:'Bank Account Number', isRequired: true}, 
        'BatchPayments$BankAccountName': {fieldId:'Accounts#BatchPayments$BankAccountName', fieldName:'BatchPayments$BankAccountName',fieldLabel:'Bank Account Name', isRequired: true}, 
        'BatchPayments$Details': {fieldId:'Accounts#BatchPayments$Details', fieldName:'BatchPayments$Details',fieldLabel:'Bank Account Details', isRequired: true}, 
        'Website': {fieldId:'Accounts#Website', fieldName:'Website',fieldLabel:'Website', isRequired: true}, 
        'XeroNetworkKey': {fieldId:'Accounts#XeroNetworkKey', fieldName:'XeroNetworkKey',fieldLabel:'Xero Network Key', isRequired: true},
        'TaxNumber': {fieldId:'Accounts#TaxNumber', fieldName:'TaxNumber',fieldLabel:'Tax Number', isRequired: true}, 
        'BrandingTheme': {fieldId:'Accounts#BrandingTheme', fieldName:'BrandingTheme',fieldLabel:'Invoice Theme', isRequired: true}, 
        'Balances': {fieldId:'Accounts#Balances', fieldName:'Balances',fieldLabel:'Balances', isRequired: true}, 
        //crmcustomisationforzohonxeroplugin__Xero_Contact_URL: {fieldId:'Accounts#RecordUrl', fieldName:'RecordUrl',fieldLabel:'Xero Contact URL', isRequired: true},         
        'SalesDefaultAccountCode': {fieldId:'Accounts#SalesDefaultAccountCode', fieldName:'SalesDefaultAccountCode',fieldLabel:'Sales Account', isRequired: true},
        'AccountsReceivableTaxType': {fieldId:'Accounts#AccountsReceivableTaxType', fieldName:'AccountsReceivableTaxType',fieldLabel:'Default Sales GST', isRequired: true},
        'Discount' : {fieldId:'Accounts#Discount', fieldName:'Discount',fieldLabel:'Sales Discount %', isRequired: true},
        'PaymentTerms$Bills&Day': {fieldId:'Accounts#PaymentTerms$Bills&Day', fieldName:'PaymentTerms$Bills&Day',fieldLabel:'Invoices Due Date Day', isRequired: true},
        'PaymentTerms$Bills&Type': {fieldId:'Accounts#PaymentTerms$Bills&Type', fieldName:'PaymentTerms$Bills&Type',fieldLabel:'Invoices Due Date Frequency', isRequired: true},
        'Addresses$AttentionTo@AddressType*POBOX': {fieldId:'Accounts#Addresses$AttentionTo@AddressType*POBOX', fieldName:'Addresses$AttentionTo@AddressType*POBOX',fieldLabel:'Postal Attention To', isRequired: true},
        'Addresses$AttentionTo@AddressType*STREET': {fieldId:'Accounts#Addresses$AttentionTo@AddressType*STREET', fieldName:'Addresses$AttentionTo@AddressType*STREET',fieldLabel:'Physical Attention To', isRequired: true},
        'Addresses$AddressLine2@AddressType*POBOX': {fieldId:'Accounts#Addresses$AddressLine2@AddressType*POBOX', fieldName:'Addresses$AddressLine2@AddressType*POBOX',fieldLabel:'Postal Address Line 2', isRequired: true},
        'Addresses$AddressLine2@AddressType*STREET': {fieldId:'Accounts#Addresses$AddressLine2@AddressType*STREET', fieldName:'Addresses$AddressLine2@AddressType*STREET',fieldLabel:'Physical Address Line 2', isRequired: true},
        'Addresses$AddressLine3@AddressType*POBOX': {fieldId:'Accounts#Addresses$AddressLine3@AddressType*POBOX', fieldName:'Addresses$AddressLine3@AddressType*POBOX',fieldLabel:'Postal Address Line 3', isRequired: true},
        'Addresses$AddressLine3@AddressType*STREET': {fieldId:'Accounts#Addresses$AddressLine3@AddressType*STREET', fieldName:'Addresses$AddressLine3@AddressType*STREET',fieldLabel:'Physical Address Line 3', isRequired: true}    
    },
    Vendors :{
        'ContactID': {fieldId:'Accounts#ContactID', fieldName:'ContactID',fieldLabel:'Contact ID', isRequired: true},
        'Name': {fieldId:'Accounts#Name', fieldName:'Name',fieldLabel:'Name', isRequired: true},
        'EmailAddress': {fieldId:'Accounts#EmailAddress', fieldName:'Name',fieldLabel:'Email Address', isRequired: true},
        'ContactNumber': {fieldId:'Accounts#ContactNumber', fieldName:'ContactNumber',fieldLabel:'Contact Number', isRequired: true},
        'AccountNumber': {fieldId:'Accounts#AccountNumber', fieldName:'AccountNumber',fieldLabel:'Account Number', isRequired: true},
        'SkypeUserName': {fieldId:'Accounts#SkypeUserName', fieldName:'SkypeUserName',fieldLabel:'Skype User Name', isRequired: true},
        'DefaultCurrency': {fieldId:'Accounts#DefaultCurrency', fieldName:'DefaultCurrency',fieldLabel:'Default Currency', isRequired: true},
        'Addresses$AddressLine1@AddressType*POBOX': {fieldId:'Accounts#Addresses$AddressLine1@AddressType*POBOX', fieldName:'Addresses$AddressLine1@AddressType*POBOX',fieldLabel:'Postal Address Line1', isRequired: true},
        'Addresses$AddressLine1@AddressType*STREET': {fieldId:'Accounts#Addresses$AddressLine1@AddressType*STREET', fieldName:'Addresses$AddressLine1@AddressType*STREET',fieldLabel:'Physical Address Line 1', isRequired: true},
        'Addresses$City@AddressType*POBOX': {fieldId:'Accounts#Addresses$City@AddressType*POBOX', fieldName:'Addresses$City@AddressType*POBOX',fieldLabel:'Postal City', isRequired: true},
        'Addresses$City@AddressType*STREET': {fieldId:'Accounts#Addresses$City@AddressType*STREET', fieldName:'Addresses$City@AddressType*STREET',fieldLabel:'Physical City', isRequired: true},
        'Addresses$Region@AddressType*POBOX': {fieldId:'Accounts#Addresses$Region@AddressType*POBOX', fieldName:'Addresses$Region@AddressType*POBOX',fieldLabel:'Postal Region', isRequired: true},
        'Addresses$Region@AddressType*STREET': {fieldId:'Accounts#Addresses$Region@AddressType*STREET', fieldName:'Addresses$Region@AddressType*STREET',fieldLabel:'Physical Region', isRequired: true},
        'Addresses$PostalCode@AddressType*POBOX': {fieldId:'Accounts#Addresses$PostalCode@AddressType*POBOX', fieldName:'Addresses$PostalCode@AddressType*POBOX',fieldLabel:'Postal Code', isRequired: true},
        'Addresses$PostalCode@AddressType*STREET': {fieldId:'Accounts#Addresses$PostalCode@AddressType*STREET', fieldName:'Addresses$PostalCode@AddressType*STREET',fieldLabel:'Physical Postal Code', isRequired: true},        
        'Addresses$Country@AddressType*POBOX': {fieldId:'Accounts#Addresses$Country@AddressType*POBOX', fieldName:'Addresses$Country@AddressType*POBOX',fieldLabel:'Postal Country', isRequired: true}, 
        'Addresses$Country@AddressType*STREET': {fieldId:'Accounts#Addresses$Country@AddressType*STREET', fieldName:'Addresses$Country@AddressType*STREET',fieldLabel:'Physical Country', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*DEFAULT', fieldName:'Phones$PhoneCountryCode@PhoneType*DEFAULT',fieldLabel:'Telephone Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*DEFAULT', fieldName:'Phones$PhoneAreaCode@PhoneType*DEFAULT',fieldLabel:'Telephone Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*DEFAULT': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*DEFAULT', fieldName:'Phones$PhoneNumber@PhoneType*DEFAULT',fieldLabel:'Telephone', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*MOBILE', fieldName:'Phones$PhoneCountryCode@PhoneType*MOBILE',fieldLabel:'Mobile Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*MOBILE', fieldName:'Phones$PhoneAreaCode@PhoneType*MOBILE',fieldLabel:'Mobile Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*MOBILE': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*MOBILE', fieldName:'Phones$PhoneNumber@PhoneType*MOBILE',fieldLabel:'Mobile', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*FAX', fieldName:'Phones$PhoneCountryCode@PhoneType*FAX',fieldLabel:'Fax Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*FAX', fieldName:'Phones$PhoneAreaCode@PhoneType*FAX',fieldLabel:'Fax Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*FAX': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*FAX', fieldName:'Phones$PhoneNumber@PhoneType*FAX',fieldLabel:'Fax', isRequired: true}, 
        'Phones$PhoneCountryCode@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneCountryCode@PhoneType*DDI', fieldName:'Phones$PhoneCountryCode@PhoneType*DDI',fieldLabel:'Direct Dial Country Code', isRequired: true}, 
        'Phones$PhoneAreaCode@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneAreaCode@PhoneType*DDI', fieldName:'Phones$PhoneAreaCode@PhoneType*DDI',fieldLabel:'Direct Dial Area Code', isRequired: true}, 
        'Phones$PhoneNumber@PhoneType*DDI': {fieldId:'Accounts#Phones$PhoneNumber@PhoneType*DDI', fieldName:'Phones$PhoneNumber@PhoneType*DDI',fieldLabel:'Direct Dial', isRequired: true}, 
        'BatchPayments$BankAccountNumber': {fieldId:'Accounts#BatchPayments$BankAccountNumber', fieldName:'BatchPayments$BankAccountNumber',fieldLabel:'Bank Account Number', isRequired: true}, 
        'BatchPayments$BankAccountName': {fieldId:'Accounts#BatchPayments$BankAccountName', fieldName:'BatchPayments$BankAccountName',fieldLabel:'Bank Account Name', isRequired: true}, 
        'BatchPayments$Details': {fieldId:'Accounts#BatchPayments$Details', fieldName:'BatchPayments$Details',fieldLabel:'Bank Account Details', isRequired: true}, 
        'Website': {fieldId:'Accounts#Website', fieldName:'Website',fieldLabel:'Website', isRequired: true}, 
        'XeroNetworkKey': {fieldId:'Accounts#XeroNetworkKey', fieldName:'XeroNetworkKey',fieldLabel:'Xero Network Key', isRequired: true},
        'TaxNumber': {fieldId:'Accounts#TaxNumber', fieldName:'TaxNumber',fieldLabel:'Tax Number', isRequired: true}, 
        'BrandingTheme': {fieldId:'Accounts#BrandingTheme', fieldName:'BrandingTheme',fieldLabel:'Invoice Theme', isRequired: true}, 
        'Balances': {fieldId:'Accounts#Balances', fieldName:'Balances',fieldLabel:'Balances', isRequired: true}, 
        //crmcustomisationforzohonxeroplugin__Xero_Contact_URL: {fieldId:'Accounts#RecordUrl', fieldName:'RecordUrl',fieldLabel:'Xero Contact URL', isRequired: true},         
        'PurchasesDefaultAccountCode': {fieldId:'Accounts#PurchasesDefaultAccountCode', fieldName:'PurchasesDefaultAccountCode',fieldLabel:'Purchase Account', isRequired: true}, 
        'AccountsPayableTaxType': {fieldId:'Accounts#AccountsPayableTaxType', fieldName:'AccountsPayableTaxType',fieldLabel:'Default Purchase GST', isRequired: true}, 
        'PaymentTerms$Bills&Day': {fieldId:'Accounts#PaymentTerms$Bills&Day', fieldName:'PaymentTerms$Bills&Day',fieldLabel:'Bills Due Date Day', isRequired: true}, 
        'PaymentTerms$Bills&Type': {fieldId:'Accounts#PaymentTerms$Bills&Type', fieldName:'PaymentTerms$Bills&Type',fieldLabel:'Bills Due Date Frequency', isRequired: true}  
    },
    Products :{
        'ItemID':{fieldId:'Accounts#ItemID', fieldName:'ItemID',fieldLabel:'Item ID', isRequired: true},
        'Name':{fieldId:'Accounts#Name', fieldName:'Name',fieldLabel:'Item Name', isRequired: true},
        'Code':{fieldId:'Accounts#Code', fieldName:'Code',fieldLabel:'Item Code', isRequired: true},
        'SalesDetails$UnitPrice' :{fieldId:'Accounts#SalesDetails$UnitPrice', fieldName:'SalesDetails$UnitPrice',fieldLabel:'Base Selling Price', isRequired: true},
        'PurchaseDetails$UnitPrice':{fieldId:'Accounts#PurchaseDetails$UnitPrice', fieldName:'PurchaseDetails$UnitPrice',fieldLabel:'Buying Price', isRequired: true},
        'QuantityOnHand':{fieldId:'Accounts#QuantityOnHand', fieldName:'QuantityOnHand',fieldLabel:'Quantity on Hand', isRequired: true},
        'TaxType':{fieldId:'Accounts#TaxType', fieldName:'TaxType',fieldLabel:'Tax', isRequired: true},
        'Taxable' :{fieldId:'Accounts#Taxable', fieldName:'Taxable',fieldLabel:'Taxable', isRequired: true},
        'Description':{fieldId:'Accounts#Description', fieldName:'Description',fieldLabel:'Sales Description', isRequired: true},
        'PurchaseDescription':{fieldId:'Accounts#PurchaseDescription', fieldName:'PurchaseDescription',fieldLabel:'Purchase Description', isRequired: true},
        'SalesDetails$AccountCode':{fieldId:'Accounts#SalesDetails$AccountCode', fieldName:'SalesDetails$AccountCode',fieldLabel:'Sales Account', isRequired: true},
        'PurchaseDetails$COGSAccountCode':{fieldId:'Accounts#PurchaseDetails$COGSAccountCode', fieldName:'PurchaseDetails$COGSAccountCode',fieldLabel:'Purchase Account', isRequired: true},
        'SalesDetails$TaxType':{fieldId:'Accounts#SalesDetails$TaxType', fieldName:'SalesDetails$TaxType',fieldLabel:'Sales Tax Rate', isRequired: true},
        'PurchaseDetails$TaxType':{fieldId:'Accounts#PurchaseDetails$TaxType', fieldName:'PurchaseDetails$TaxType',fieldLabel:'Purchase Tax Rate', isRequired: true},
        'InventoryAssetAccountCode':{fieldId:'Accounts#InventoryAssetAccountCode', fieldName:'InventoryAssetAccountCode',fieldLabel:'Inventory Asset Account', isRequired: true},
        //crmcustomisationforzohonxeroplugin__Xero_Item_URL:{fieldId:'Accounts#RecordUrl', fieldName:'RecordUrl',fieldLabel:'Record Url', isRequired: true}
    },
    Purchase_Orders:{
        'InvoiceID':{fieldId:'Accounts#InvoiceID', fieldName:'InvoiceID',fieldLabel:'Purchase Order ID', isRequired: true},
        'Reference':{fieldId:'Accounts#Reference', fieldName:'Reference',fieldLabel:'Reference', isRequired: true},
        'Date':{fieldId:'Accounts#Date', fieldName:'Date',fieldLabel:'Date', isRequired: true},
        'DueDate':{fieldId:'Accounts#DueDate', fieldName:'DueDate',fieldLabel:'Due Date', isRequired: true},
        'Status':{fieldId:'Accounts#Status', fieldName:'Status',fieldLabel:'Status', isRequired: true},
        'Contact$ContactID':{fieldId:'Accounts#Contact$ContactID', fieldName:'Contact$ContactID',fieldLabel:'Contact Name', isRequired: true},
        'LineItems':{fieldId:'Accounts#LineItems', fieldName:'LineItems',fieldLabel:'Item Details', isRequired: true},
        'AmountDue':{fieldId:'Accounts#AmountDue', fieldName:'AmountDue',fieldLabel:'Amount Due', isRequired: true},
        'AmountPaid':{fieldId:'Accounts#AmountPaid', fieldName:'AmountPaid',fieldLabel:'Amount Paid', isRequired: true},
        'CurrencyCode':{fieldId:'Accounts#CurrencyCode', fieldName:'CurrencyCode',fieldLabel:'Currency Code', isRequired: true},
        'SubTotal':{fieldId:'Accounts#SubTotal', fieldName:'SubTotal',fieldLabel:'Sub Total', isRequired: true},
        'TotalDiscount':{fieldId:'Accounts#TotalDiscount', fieldName:'TotalDiscount',fieldLabel:'Total Discount', isRequired: true},
        'TotalTax':{fieldId:'Accounts#TotalTax', fieldName:'TotalTax',fieldLabel:'Total Tax', isRequired: true},
        'Total':{fieldId:'Accounts#Total', fieldName:'Total',fieldLabel:'Total', isRequired: true},
        //crmcustomisationforzohonxeroplugin__Xero_Bill_URL:{fieldId:'Accounts#RecordUrl', fieldName:'RecordUrl',fieldLabel:'Record Url', isRequired: true}       
    },
    Invoices:{
        'InvoiceID':{fieldId:'Accounts#InvoiceID', fieldName:'InvoiceID',fieldLabel:'Invoice ID', isRequired: true},
        'InvoiceNumber':{fieldId:'Accounts#InvoiceNumber', fieldName:'InvoiceNumber',fieldLabel:'Invoice Number', isRequired: true},
        'Reference':{fieldId:'Accounts#Reference', fieldName:'Reference',fieldLabel:'Reference', isRequired: true},
        'Date':{fieldId:'Accounts#Date', fieldName:'Date',fieldLabel:'Date', isRequired: true},
        'DueDate':{fieldId:'Accounts#DueDate', fieldName:'DueDate',fieldLabel:'Due Date', isRequired: true},
        'Status':{fieldId:'Accounts#Status', fieldName:'Status',fieldLabel:'Status', isRequired: true},
        'Contact$ContactID':{fieldId:'Accounts#Contact$ContactID', fieldName:'Contact$ContactID',fieldLabel:'Contact Name', isRequired: true},
        'LineItems':{fieldId:'Accounts#LineItems', fieldName:'LineItems',fieldLabel:'Item Details', isRequired: true},
        'AmountDue':{fieldId:'Accounts#AmountDue', fieldName:'AmountDue',fieldLabel:'Amount Due', isRequired: true},
        'AmountPaid':{fieldId:'Accounts#AmountPaid', fieldName:'AmountPaid',fieldLabel:'Amount Paid', isRequired: true},
        'AmountCredited':{fieldId:'Accounts#AmountCredited', fieldName:'AmountCredited',fieldLabel:'Amount Credited', isRequired: true},
        'CurrencyCode':{fieldId:'Accounts#CurrencyCode', fieldName:'CurrencyCode',fieldLabel:'Currency Code', isRequired: true},
        'SubTotal':{fieldId:'Accounts#SubTotal', fieldName:'SubTotal',fieldLabel:'Sub Total', isRequired: true},
        'TotalDiscount':{fieldId:'Accounts#TotalDiscount', fieldName:'TotalDiscount',fieldLabel:'Total Discount', isRequired: true},
        'TotalTax':{fieldId:'Accounts#TotalTax', fieldName:'TotalTax',fieldLabel:'Total Tax', isRequired: true},
        'BrandingThemeID':{fieldId:'Accounts#BrandingThemeID', fieldName:'BrandingThemeID',fieldLabel:'Branding Theme', isRequired: true},
        //crmcustomisationforzohonxeroplugin__Xero_Invoice_Url:{fieldId:'Accounts#RecordUrl', fieldName:'RecordUrl',fieldLabel:'Record Url', isRequired: true}       
    } 
};

const zohoToXeroDefaultMappingStatus = {    
    Created : 'DRAFT',
    Approved : 'AUTHORIZED',
    Delivered : 'SUBMITTED',
    Cancelled : 'VOIDED'    
};

const xeroStatusInfo = {
    DRAFT:'DRAFT',
    AUTHORIZED:'AUTHORIZED',
    SUBMITTED:'SUBMITTED',
    VOIDED:'VOIDED',
    PAID:'PAID',
    DELETED:'DELETED'
};


function getXeroMappingFieldInfoByCrmFieldApiName({moduleName, crmFieldApiName}){
    if(!zohoToXeroDefaultMappingFields[moduleName] 
        || !zohoToXeroDefaultMappingFields[moduleName][crmFieldApiName])
        return undefined;
    let xeroFieldName = zohoToXeroDefaultMappingFields[moduleName][crmFieldApiName];
    return xeroMappingsInfo[moduleName][xeroFieldName];
}

function getXeroAvailableFieldsByModuleName(moduleName){
    if(!([moduleName] in xeroMappingsInfo)) 
        return undefined;
    return xeroMappingsInfo[moduleName];
}

function getXeroAvailableStatus()
{
    return xeroStatusInfo;
}
function getZohoToXeroDefaultMappingStatus()
{
    return zohoToXeroDefaultMappingStatus;
}

module.exports = {
    getXeroMappingFieldInfoByCrmFieldApiName,
    getXeroAvailableFieldsByModuleName: getXeroAvailableFieldsByModuleName,
    getXeroAvailableStatus,
    getZohoToXeroDefaultMappingStatus
}