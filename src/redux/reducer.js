
const initState = {
    result: JSON.parse(localStorage.getItem('result')) || [],
    edit: undefined,
    openForm: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'result/addValue':
            localStorage.setItem("result", JSON.stringify([...state.result, action.payload]));
            return {
                ...state,
                openForm: false,
                result: [
                    ...state.result,
                    action.payload
                ]
            }

        case 'result/updateValue':
            const newUpdateValue = state.result.map((values, index) =>
                index !== state.edit.index ? values : action.payload
            );
            const updateValue = {
                ...state,
                result: [
                    ...newUpdateValue
                ],
                edit: undefined,
                openForm: false
            };

            localStorage.setItem('result', JSON.stringify(newUpdateValue))

            return updateValue

        case 'result/deleteValue':
            const newValue = state && state.result && Array.isArray(state.result) && state.result.filter((values, index) => index !== action.payload)
            const deleteData = {
                ...state,
                result: newValue,
            };
            localStorage.setItem('result', JSON.stringify(newValue))
            return deleteData

        case 'result/editValue':
            return {
                ...state,
                openForm: true,
                edit: action.payload
            }
        case 'result/openFormValue':

            return {
                ...state,
                openForm: true,
            }

        case 'result/closeFormValue':

            return {
                ...state,
                openForm: false,
            }

        default:
            return state
    }
}

export default rootReducer