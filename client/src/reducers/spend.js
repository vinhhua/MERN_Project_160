//  reducer or spend
export default (spend = [], action) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...spend, action.payload];
        case 'DELETE':
            return spend.filter((s) => s._id !== action.payload);       //  filter out
        case 'UPDATE':
            return spend.map((s) => s._id === action.payload._id ? action.payload : s);     //  map data
        default:
            return spend;
    }
}