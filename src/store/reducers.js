import {ACTIVITIES, DATACHANGE} from './actionTypes'


const initialState = {
    activity:{
        key:"all",
        text:"All"
    },
    maindata:[{
    "chartData": {
        "totalTime": {
            "total": "0"
        },
        "studyTime": {
            "total": "0"
        },
        "classTime": {
            "total": "0"
        },
        "freeTime": {
            "total": "0"
        }
    },
    "freeTimeMaxUsage": "0",
    "deviceUsage": {
        "totalTime": {
            "mobile": "0",
            "laptop": "0"
        },
        "studyTime": {
            "mobile": "0",
            "laptop": "0"
        },
        "classTime": {
            "mobile": "0",
            "laptop": "0"
        },
        "freeTime": {
            "mobile": "0",
            "laptop": "0"
        }
    }
}]
}

export const mainReducer = (state = initialState,action) => {
    switch (action.type) {
        case ACTIVITIES:
            return {...state,activity:action.choice}
        case DATACHANGE:
            return {...state,maindata:action.data}
        default:
            return state
    }
}