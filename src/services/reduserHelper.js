export const mapMetadataRequest = state => {
    return { ...state, metadata: {isProcessing: true} };
};

export const getMetadata = (action, reducerName) => {
    let metadata = {
        isProcessing: false
    };
    if (action[reducerName] && action[reducerName].metadata && action[reducerName].metadata.error) {
        metadata.error = action[reducerName].metadata.error;
    }
    return metadata;
};

export const mapMetadataSuccess = (state, action, reducerName) => {
    return { ...state, ...action[reducerName], metadata: getMetadata(action, reducerName) };
};

export const mapMetadataSuccessRemove = (state, action, reducerName) => {
    const events = _.cloneDeep(state.data);
    const data = _(events)
        .filter(event => event._id !== action.payload)
        .value();
    return { ...state, data, metadata: getMetadata(action, reducerName) };
};

export const mapMetadataSuccessUpdate = (state, action, reducerName) => {
    console.log(action[reducerName]);
    const events = _.cloneDeep(state.data);
    const data = _(events)
        .map(event => {
            if (event._id === action.payload._id) {
                event = action[reducerName].data
            }
            return event;
        })
        .value();
    return { ...state, data, metadata: getMetadata(action, reducerName) };
};

export const mapMetadataFailure = (state, action, reducerName) => {
    return { ...state, metadata: getMetadata(action, reducerName) };
};
