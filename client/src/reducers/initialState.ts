export const initialState = {
  user: {
    current: null,
    id: null
  },
  record: {
    list: [],
    id: null
  },
  category: {
    list: [],
    current: null,
    id: null
  },
  common: {
    ajaxCallsInProgress: false
  }
};

export interface CategoryReducerState {
  list: any[];
  current: any | null;
  id: number | null;
}

export interface RecordReducerState {
  list: any[];
  id: number | null;
}
