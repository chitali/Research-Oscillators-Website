export const CHANGE_FREQUENCY = 'CHANGE_FREQUENCY';
export const CHANGE_VOLUME = 'CHANGE_VOLUME';
export const INIT_OSCILLATORS = 'INIT_OSCILLATORS';
export const AUDIO = 'AUDIO';

export function initOscillators(oscillator){
    return{
        type: INIT_OSCILLATORS,
        oscillator
    }
}

export function changeVolume(amount, id){
    return{
        type: CHANGE_VOLUME,
        amount: amount,
        id
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