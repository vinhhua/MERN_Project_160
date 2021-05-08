export default (exercises = [], action) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...exercises, action.payload];
        case 'DELETE':
            return exercises.filter((exr) => exr._id !== action.payload);
        case 'UPDATE':
            return exercises.map((exr) => exr._id === action.payload._id ? action.payload : exr);     //  map data
        default:
            return exercises;
    }
}