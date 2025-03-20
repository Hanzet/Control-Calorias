import { Activity } from '../types'

export type ActivityActions = 
    {type: 'save-activity', payload: { newActivity : Activity}}

type ActivityState = {
    activities: Activity[],
    auth: true
}

export const initialState : ActivityState = {
    activities: []
}

export const activityReducer = (
        state : ActivityState = initialState,
        action : ActivityActions
    ) => {

    if (action.type === 'save-activity') {
        // Este código maneja la lógica para actualizar el state con la nueva actividad

        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    return state
}