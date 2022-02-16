const shelfReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_SHELF':
            return action.payload;

        default:
            return state;
    }
}
export default shelfReducer;
