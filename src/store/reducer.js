const handleVisualData = (state) => {
    let visualData = state.data.filter( item => {
        if (state.filters.all && item["Всі"] !== "TRUE")
            return false;
        if (state.filters.vpo && item["ВПО"] !== "TRUE")
            return false;
        if (state.filters.age !== -1 && !(state.filters.age >= item.fromAge && state.filters.age <= item.toAge))
            return false;
        return true;
    });
    return {
        ...state,
        visualData
    }
};

const Reducer = (state, action) => {
    console.log("Reducer");
    console.log(state);
    console.log(action);
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