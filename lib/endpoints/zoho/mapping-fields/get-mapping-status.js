const _ = require('underscore');
const response = require('../../../common/endpoints-responses');
const dynamoDB = require('../../../../bin/repo/status-mapping-repo');
const {hooksWithPathValidation} = require('../../../common/hooks');
const yup = require('yup');

const getMappingStatus= async(event)=>{   
    try 
    {       
        const moduleName = event?.pathParameters?.moduleName; 
        const userId = process.env.userId 
        const res = await dynamoDB.get(userId, moduleName);

        if(!_.isEmpty(res.Items)) 
            return response._200(res.Items);
        return response._404(res);
            
    } 
    catch (err) { return response._500(err)}
}
const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});

module.exports = {
    getMappingStatus: hooksWithPathValidation(pathSchema)(getMappingStatus)
}

