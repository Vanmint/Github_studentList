export const addValue = (data) => {
    return {
        type: 'result/addValue',
        payload: data

    }
}

export const deleteValue = (index) => {
    return {
        type: 'result/deleteValue',
        payload: index
    }
}

export const updateValue = (data) => {
    return {
        type: 'result/updateValue',
        payload: data
    }
}

export const editValue = (data) => {
    return {
        type: 'result/editValue',
        payload: data
    }
}

export const openFormValue = () => {
    return {
        type: 'result/openFormValue',
    }
}

export const closeFormValue = () => {
    return {
        type: 'result/closeFormValue',
    }
}