import {
   SUMMARY_UPDATE,
} from '../actions/order';

const initialState = {
    summary:0
  };
export default function summaryUpdate(state = {
}, action) {
    switch (action.type) {
        case SUMMARY_UPDATE:
            let temp=state.summary+action.summary
            return Object.assign({}, state, {
                summary:temp
            });
      
        default:
            return state;
    }
}
