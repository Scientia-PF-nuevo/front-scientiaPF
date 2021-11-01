

const initialState = {
    name: '',
    description: '',
    price: 0,
    url: '',
    urlVideo: '',
    category: '',
    email: '',
    leng: '',
    dif: '',
    amount: 0,
    percentage: 0
}

export default function reducerForm(state = initialState, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload.description
            }
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload.category,
                leng: action.payload.leng,
                dif: action.payload.dif,
                price: action.payload.price
            }
        case 'SET_URL':
            return {
                ...state,
                url: action.payload.url,
                urlVideo: action.payload.urlVideo,
            }
        case 'SET_AMOUNT':
            return {
                ...state,
                amount: action.payload.amount,
                percentage: action.payload.percentage,
            }
    default:
        return state;
    }
};