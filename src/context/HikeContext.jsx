import { createContext, useReducer } from "react"

export const HikesContext = createContext()

export const hikesReducer = (state, action) => {
  switch (action.type) {
    case "SET_HIKES":
      return {
        hikes: action.payload,
      }
    case "CREATE_HIKE":
      return {
        hikes: [action.payload, ...state.hikes],
      }
    default:
      return state
  }
}

// we wrap App in main.jsx and then accept the App comonent here as children
export const HikesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hikesReducer, {
    hikes: null,
  })
  // the argument to the dispatch function is called the action. it has a type property and a payload property
  // dispatch({type, payload})
  return (
    <HikesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HikesContext.Provider>
  )
}
