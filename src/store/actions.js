import {ACTIVITIES,DATACHANGE} from './actionTypes'


export const activities = (choice) => ({
    type:ACTIVITIES,
    choice:choice
})
export const datachange = (data) => ({
    type:DATACHANGE,
    data:data
})