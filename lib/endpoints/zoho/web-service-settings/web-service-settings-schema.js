const yup = require('yup');

const schema = yup.object().shape({    
    CDataCenter: yup.string().required(),
    CClientSecret: yup.string().required(),
    CClientId :  yup.string().required(),
    CAccessToken : yup.string().required(),
    CRefToken: yup.string().required(),
    CApiDom :  yup.string().required(),
    CExIn : yup.number().integer().required(),
    CExInSec : yup.number().integer().required(),
    CTimeZone :  yup.string().required(),
    CConnectTo :  yup.string().required(),
    CSalesDiscountOp :  yup.string().required(),
    CSalesTaxOp :  yup.string().required(),
    CWftriggerOp :  yup.string().required(),
    XClientId : yup.string().required(),
    XClientSecret : yup.string().required(),
    XState : yup.string().required(), 
    XTenant: yup.array().of(yup.object({
        XIdToken: yup.string().required(),
        XAccessToken: yup.string().required(),
        XTennanId: yup.string().required(),
        XTokenType: yup.string().required(),
        XExpiresIn: yup.number().integer().required(),
        XExpiresInSec: yup.number().integer().required(),
        XRefToken: yup.string().required()
    })),           
    XTimeZone: yup.string().required(),
    XCurrency :  yup.string().required(),
    OvrwXInvoiceNo : yup.boolean().required(),
    OvrwEmptyFieldXToC :  yup.string().required(),
    OvrwEmptyFieldCToX: yup.string().required(),
    NotifyEmail: yup.string().required(),
    CutOffDTime: yup.string().required(),
    LogRetentionDays: yup.number().integer().required(),
    AddIp: yup.string().required()
});
module.exports= {    
    webServiceSettingsBodyValidationSchema :  schema
}