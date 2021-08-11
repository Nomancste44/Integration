const _ = require('underscore');
const response = require('../../../common/endpoints-responses');
const dynamoDb = require('../../../../bin/repo/fields-mapping-repo');
const {hooksWithPathValidation} = require('../../../common/hooks');
const yup = require('yup');
const getMappingFields= async(event)=>{   
    try 
    {      
        const moduleName = event?.pathParameters?.moduleName; 
        const userId = process.env.userId 
        const res = await dynamoDb.get(userId, moduleName);

        if(!_.isEmpty(res.Items)) 
            return response._200(res);
        return response._404(res);
            
    } 
    catch (err) { return response._500(err)}
}
const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});

module.exports = {
    getMappingFields: hooksWithPathValidation(pathSchema)(getMappingFields)
}

