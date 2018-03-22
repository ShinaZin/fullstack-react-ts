import * as types from '../actionTypes/recordActionTypes';
import {initialState, RecordReducerState} from './initialState';
import * as _ from 'lodash';

const recordReducer = (state: RecordReducerState = initialState.record, action) => {
  switch (action.type) {
    case types.LOAD_RECORDS_SUCCESS:
      return {
        ...state,
        list: action.payload.records
      };

    case types.DELETE_RECORD_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list.filter(record => record.id !== action.payload.id)]
      });

    default:
      return state;
  }
};

export default recordReducer;
