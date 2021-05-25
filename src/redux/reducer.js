import {AUDIO, CHANGE_FREQUENCY, CHANGE_VOLUME, INIT_OSCILLATORS} from './actions'

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

export default function rootReducer(state = {}, action){
    return {
        oscillators: oscillatorsReducer(state.oscillators, action)
    };
}