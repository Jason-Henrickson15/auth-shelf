import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchItems() {
    try {
        const response = yield axios.get('/api/shelf');
        console.log('this is the response', response.data);
        yield put({ type: 'STORE_SHELF', payload: response.data });
    } catch (error) {
        console.log('ERROR in GET shelf.saga', error);
    }
}

function* addItem(action) {
    try {
        console.log('this is what is being added', action.payload);

        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'GET_SHELF' })
    } catch (error) {
        console.log('there was an error posting', error);
    }
}

function* deleteItem(action) {
    try {
        console.log('this is the id of the deleted ID', action.payload);
        yield axios.delete(`/api/shelf/${action.payload.user_id}/${action.payload.id}`);
        yield put({ type: 'GET_SHELF' });
    } catch (error) {
        console.log('there was an error deleting', error);
    }
}

function* shelfSaga() {
    yield takeEvery('GET_SHELF', fetchItems);
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('REMOVE_ITEM', deleteItem);
}

export default shelfSaga;