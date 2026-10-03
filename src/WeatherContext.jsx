import { createContext, useState } from "react";

export const WeatherContext = createContext(null)

function WeatherProvider ({children}) {
    const [text, setText] = useState('')

    function inputText (textHero) {
        setText(textHero)
    }
    
    return (
        <WeatherContext.Provider value={{inputText}}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider