const {useHooks,logEvent, parseEvent,handleUnexpectedError} = require('lambda-hooks');
const {KeyValuePairs} = require('./common');

const setUserId = async state=>{
    let {event} = state;
   // process.env.userId = event.headers[KeyValuePairs.userId];
    process.env.userId = KeyValuePairs.userId;
    return state;
}

const validateBody = async state => {

    const { bodySchema } = state.config;

    if (!bodySchema) {
        throw Error('missing the required body schema');
    }

    try {
        const { event } = state;

        await bodySchema.validate(event.body, { strict: true });
    } catch (error) {
        console.log('yup validation error of event.body', error);
        state.exit = true;
        state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
    return state;
}

const validatePaths = async state => {
    const { pathSchema } = state.config;

    if (!pathSchema) {
        throw Error('missing the required path schema');
    }

    try {
        const { event } = state;

        await pathSchema.validate(event.pathParameters, { strict: true });
    } catch (error) {
        console.log('yup validation error of path parameters', error);
        state.exit = true;
        state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
    return state;
};

const hooks = useHooks({
    before:[logEvent,parseEvent,setUserId],
    after:[],
    onerror:[handleUnexpectedError]
});

const hooksWithBodyValidation = bodySchema =>{
    return useHooks({
        before:[logEvent,parseEvent,validateBody,setUserId],
        after:[],
        onerror:[handleUnexpectedError]
    },{
        bodySchema
    });
}

const hooksWithPathValidation = pathSchema =>{
    return useHooks({
        before:[logEvent,parseEvent,validatePaths,setUserId],
        after:[],
        onerror:[handleUnexpectedError]
    },{
        pathSchema
    });
}

const hooksWithPathAndBodyValidation =({pathSchema,bodySchema}) =>{
    return useHooks({
        before:[logEvent,parseEvent,validatePaths,validateBody,setUserId],
        after:[],
        onerror:[]
    },{
        pathSchema,
        bodySchema
    });
}
module.exports ={
    hooks,
    hooksWithBodyValidation,
    hooksWithPathValidation,
    hooksWithPathAndBodyValidation
}