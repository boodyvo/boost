import React, {createContext, useReducer} from "react";
import Reducer from './reducer'

const initialState = {
    data: [],
    visualData: [],
    filters: {
        all: true,
        vpo: false,
        age: -1,
    },
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;