export const CHANGE_FREQUENCY = 'CHANGE_FREQUENCY';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const INIT_OSCILLATORS = 'INIT_OSCILLATORS';
export const AUDIO = 'AUDIO';
export const REMOVE_OSCILLATOR = 'REMOVE_OSCILLATOR';
export const CHANGE_ALL_VOLUME = 'CHANGE_ALL_VOLUME';
export const INSTRUMENT_PERCENT = 'INSTRUMENT_PERCENT';

export function initOscillators(oscillator){
    return{
        type: INIT_OSCILLATORS,
        oscillator
    }
}
export function removeOscillator(id){
    return{
        type: REMOVE_OSCILLATOR,
        id
    }
}

export function changeVolume(amount, id){
    return{
        type: CHANGE_VOLUME,
        amount: amount,
        id
    }
}

export function changeAllVolume(amount, instrument){
    return{
        type: CHANGE_ALL_VOLUME,
        amount: amount,
        instrument
    }
}

export function audio(osc, id){
    return{
        type: AUDIO,
        osc: osc,
        id
    }
}

export function changeFrequency(amount, instrument){
    return{
        type: CHANGE_FREQUENCY,
        amount: amount,
        instrument
    }
}

export function instrumentPercent(percent){
    return{
        type: INSTRUMENT_PERCENT,
        percent
    }
}