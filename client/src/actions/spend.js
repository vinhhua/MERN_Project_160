import axios from 'axios';
const url = 'http://localhost:5000/spend-data';

//  AXIOS CALLS
const axiosGet = () => axios.get(url);
const axiosCreate = (newData) => axios.post(url, newData);
const axiosPatch = (id, postData) => axios.patch(`${url}/${id}`, postData);
const axiosDelete = (id) => axios.delete(`${url}/${id}`);

//  ACTION CREATORS - return/dispatch action which has type & payload (data)
//  GET
export const getData = () => async(dispatch) => {
    try {
        const { data } = await axiosGet();        //  acquire data
        dispatch({ type: 'FETCH_ALL', payload: data });       //  allocate payload
    } catch(error) {
        console.log(error);
    }
}

//  CREATE
export const createData = (newData) => async(dispatch) => {
    try {
        const { data } = await axiosCreate(newData);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

//  DELETE
export const deleteData = (id) => async(dispatch) => {
    try {
        await axiosDelete(id);
        dispatch({ type: 'DELETE', payload: id});
    } catch (error) {
        console.log(error);
    }
}

//  EDIT
export const editData = (id, postData) => async(dispatch) => {
    try {
        const { data } = await axiosPatch(id, postData);
        dispatch({ type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}
