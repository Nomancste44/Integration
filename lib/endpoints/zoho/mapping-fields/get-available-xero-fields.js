const {getXeroAvailableFieldsByModuleName: getXeroAvailableFieldsByModuleName} = require('../../../common/xero-default-mappings');
const {hooksWithPathValidation} = require('../../../common/hooks');
const response = require('../../../common/endpoints-responses');
const yup = require('yup');

const getAvailableXeroFields = async(event)=>{        
    try
    {   const moduleName = event?.pathParameters?.moduleName;    
        let availableFields = await getXeroAvailableFieldsByModuleName(moduleName);
        return availableFields;
    }
    catch (err) { return response._500(err)}
}

const pathSchema = yup.object().shape({
    moduleName: yup.string().required(),
});

module.exports = {
    getAvailableXeroFields : hooksWithPathValidation(pathSchema)(getAvailableXeroFields),
}