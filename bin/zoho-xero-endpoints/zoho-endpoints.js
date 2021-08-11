const getZohoFieldMappingUrl = (moduleName)=>{
    return `crm/v2.1/settings/layouts?module=${moduleName}`;
}

const getZohoRecordsFetchingUrl = (moduleName,page)=>{
    return `crm/v2.1/${moduleName}?page=${page}`;
}

const postZohoRecordsFetchingUrl = (moduleName)=>{
    return `crm/v2.1/${moduleName}`;
}

const xeroTaxMappingUrl = ()=>{
    return 'https://api.xero.com/api.xro/2.0/TaxRates';
}

const getZohoTaxMappingUrl = ()=>{
    return 'crm/v2/settings/fields?module=Products';
}

module.exports ={
    contacts: 'https://www.zohoapis.com/crm/v2/contacts',
    getZohoFieldMappingUrl,
    getZohoRecordsFetchingUrl,
    postZohoRecordsFetchingUrl,
    xeroTaxMappingUrl,
    getZohoTaxMappingUrl
}