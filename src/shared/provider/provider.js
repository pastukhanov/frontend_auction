import { useReducer, useEffect } from "react";
import ProviderContext from "./providerContext";
import { initialState } from "./reducer/initialState";
import reducer from "./reducer/reducer";


const Provider = ({children}) =>{

    const[state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.token) {
          localStorage.setItem('token', state.token);
        } else {
          localStorage.removeItem('token');
        }
      }, [state.token]
    );
    

    return (
        <ProviderContext.Provider value={{ state, dispatch }}>
            {children}
        </ProviderContext.Provider>
    )
}

export default Provider;