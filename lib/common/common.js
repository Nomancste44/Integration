class KeyValuePairs{
    static currentDate = new Date().toISOString();
    static userId = 'Noman';
    static tblUsersPrimaryKey = "UserId";

    static zohoAccessTokenColumnName = "zohoAccessToken";
    static zohoRefreshTokenColumnName = "zohoRefreshToken";
    static zohoApiDomainColumnName = "zohoApiDomain";
    static zohoClientIdColumnName = "zohoClientId";
    static zohoClientSecretColumnName = "zohoClientSecret";

    static xeroAccessTokenColumnName = "xeroAccessToken";
    static xeroRefreshTokenColumnName = "xeroRefreshToken";
    static xeroClientIdColumnName = "xeroClientId";
    static xeroClientSecretColumnName = "xeroClientSecret";
    static xeroTenantIdsColumnName = "xeroTenantIds";
    static xeroTenantIdHeader = 'xero_tenant_id'
    static xeroRedirectUri = 'https://localhost:4200/settings';

}
class ZohoModules{
    static accounts = 'Accounts';
    static contacts = 'Contacts';
    static products = 'Products';
    static vendors = 'Vendors';
    static invoices = 'Invoices';
    static purchaseOrders = 'Purchase_Orders';
}
class XeroModules{
    static accounts = 'Accounts';
    static contacts = 'Contacts'; 
    static brandingThemes = 'BrandingThemes';   
    static items = 'Items';
}
module.exports ={
    KeyValuePairs,
    ZohoModules,
    XeroModules
}