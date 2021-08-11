
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const { v4: uuid } = require('uuid');
const { hooksWithBodyValidation } = require('../../../common/hooks');
const {webServiceSettingsBodyValidationSchema} = require('./web-service-settings-schema');
const dynamo = require('../../../common/dynamoDb');
const response = require('../../../common/endpoints-responses');
const { tableNameList } = require('../../../../bin/tableNames');
const { KeyValuePairs } = require('../../../common/common');

const tableName = tableNameList.webServiceSettings;

const addSetting= async(event)=>{   
    
    const reqBody = event.body;     
    const data = {
        WebSerSettingId :uuid(),
        UserId : KeyValuePairs.userId,
        CDataCenter:  reqBody.CDataCenter,
        CClientSecret: reqBody.CClientSecret,
        CClientId :  reqBody.CClientId,
        CAccessToken : reqBody.CAccessToken,
        CRefToken: reqBody.CRefToken,
        CApiDom :  reqBody.CApiDom,
        CExIn :  reqBody.CExIn,
        CExInSec :  reqBody.CExInSec,
        CTimeZone :  reqBody.CTimeZone,
        CConnectTo :  reqBody.CConnectTo,
        CSalesDiscountOp :  reqBody.CSalesDiscountOp,
        CSalesTaxOp :  reqBody.CSalesTaxOp,
        CWftriggerOp :  reqBody.CWftriggerOp,
        XClientId : reqBody.XClientId,
        XClientSecret : reqBody.XClientSecret,
        XState : reqBody.XState,
        XTenant: {M: reqBody.XTenant},
        XTimeZone: reqBody.XTimeZone,
        XCurrency :  reqBody.XCurrency,
        OvrwXInvoiceNo : reqBody.OvrwXInvoiceNo,
        OvrwEmptyFieldXToC :  reqBody.OvrwEmptyFieldXToC,
        OvrwEmptyFieldCToX: reqBody.OvrwEmptyFieldCToX,
        NotifyEmail: reqBody.NotifyEmail,
        CutOffDTime: reqBody.CutOffDTime,
        LogRetentionDays: reqBody.LogRetentionDays,
        AddIp: reqBody.AddIp,
        CreatedOn: new Date().toISOString(),
        UpdatedOn:new Date().toISOString()
    };    
    const res = await dynamo.write(data,tableName);    
    return response._200(res);
    
}
module.exports={
    addSetting : hooksWithBodyValidation(webServiceSettingsBodyValidationSchema)(addSetting) 
}