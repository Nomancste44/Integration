const {getXeroAvailableStatus} = require('../../../common/xero-default-mappings');
const response = require('../../../common/endpoints-responses');
const {hooks} = require('../../../common/hooks');

const getAvailableXeroStatus = async(event)=>{        
    try
    {   
        let availableStatus = await getXeroAvailableStatus();
        return availableStatus;
    }
    catch (err) { return response._500(err)}
}
module.exports = {
    getAvailableXeroStatus : hooks(getAvailableXeroStatus)
}