import { typesAssistance } from "../config/consts";

const handleVisualData = (state) => {
    let visualData = state.data.filter( item => {
        if (state.filters.all && item["Всі"] !== "TRUE")
            return false;
        if (state.filters.vpo && item["ВПО"] !== "TRUE")
            return false;
        if (state.filters.age !== -1 && !(state.filters.age >= item.fromAge && state.filters.age <= item.toAge))
            return false;

        // Check if we have appropriate type. If none is chosen we skip this
        let foundTypes = [];
        for (let key in typesAssistance) {
            if (state.filters[key]) {
                foundTypes.push(typesAssistance[key]);
            }
        }
        if (foundTypes.length > 0 && Object.values(foundTypes).indexOf(item["Тип"]) === -1)
            return false;

        // If pass all checks we keep an element to display
        return true;
    });
    return {
        ...state,
        visualData
    }
};

const Reducer = (state, action) => {
    // Check if action is changing type checkbox
    for (let key in typesAssistance) {
        if (`SET_FILTER_${key.toUpperCase()}` === action.type) {
            console.log("Found action", action.type);
            return handleVisualData({
                ...state,
                filters: {
                    ...state.filters,
                    [key]: action.payload,
                }
            });
        }
    }

    switch (action.type) {
        case "SET_DATA":
            console.log(handleVisualData({
                ...state,
                data: action.payload,
            }));
            return handleVisualData({
                ...state,
                data: action.payload,
            });
        case "SET_FILTER_ALL":
            return handleVisualData({
                ...state,
                filters: {
                    ...state.filters,
                    all: action.payload,
                }
            });
        case "SET_FILTER_VPO":
            return handleVisualData({
                ...state,
                filters: {
                    ...state.filters,
                    vpo: action.payload,
                }
            });
        case "SET_FILTER_AGE":
            return handleVisualData({
                ...state,
                filters: {
                    ...state.filters,
                    age: action.payload,
                }
            });
        default:
            return state;
    }
};

export default Reducer;