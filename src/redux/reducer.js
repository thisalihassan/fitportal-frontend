
import { REHYDRATE } from 'redux-persist/lib/constants'; 

export default function reducer(state= {}, action){
switch(action.type){
    case REHYDRATE:
      return { ...state, persistedState: action.payload };
    break;
}}