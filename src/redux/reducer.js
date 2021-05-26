import { combineReducers } from 'redux';
import {AUDIO, CHANGE_FREQUENCY, CHANGE_VOLUME, INIT_OSCILLATORS, REMOVE_OSCILLATOR, CHANGE_ALL_VOLUME, INSTRUMENT_PERCENT} from './actions'

function oscillatorsReducer(state = [], action){
    switch(action.type){
        case INIT_OSCILLATORS:
            return [
                ...state,
                {
                    id: action.oscillator.id,
                    freq: action.oscillator.freq,
                    vol: action.oscillator.vol,
                    osc: action.oscillator.osc,
                    instrument: action.oscillator.instrument
                }
            ];
        
        case REMOVE_OSCILLATOR:
            return state.filter(oscillator => oscillator.id !== action.id);

        case CHANGE_FREQUENCY:
            var count = 1;
            return state.map(oscillator =>(
                oscillator.instrument === action.instrument ? {
                    ...oscillator,
                    freq: action.amount * count++
                } : oscillator                    
            ));

        case CHANGE_VOLUME:
            return state.map(oscillator =>(
                oscillator.id === action.id ? {
                    ...oscillator,
                    vol: action.amount
                } : oscillator
            ));

        case CHANGE_ALL_VOLUME:
            return state.map(oscillator =>(
                {
                    ...oscillator,
                    vol: oscillator.vol + action.amount
                }
            ));

        case AUDIO:
            return state.map(oscillator =>(
                oscillator.id === action.id ? {
                    ...oscillator,
                    osc: action.osc
                } : oscillator
            ));

        default:
            return state;
    }

}

function instrumentReducer(state=50, action){
    switch(action.type){
        case INSTRUMENT_PERCENT:
            return action.percent;
        default:
            return state;
    }
}

// export default function rootReducer(state = {}, action){
//     return {
//         oscillators: oscillatorsReducer(state.oscillators, action)
//     };
// }

const rootReducer = combineReducers({
    oscillators: oscillatorsReducer,
    percent: instrumentReducer
});
export default rootReducer;