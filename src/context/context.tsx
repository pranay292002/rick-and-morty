import { EpisodeIdContextType, EpisodeProviderProps } from "@/types/types"
import { createContext, useState} from "react"

const defaultState : EpisodeIdContextType = {episodeId:NaN, setEpisodeId:(episodeId:number)=>{} } as EpisodeIdContextType

export const EpisodeContext = createContext<EpisodeIdContextType>(defaultState)

export default function EpisodeProvider ({children}:EpisodeProviderProps){

const [episodeId, setEpisodeId] = useState(NaN)


return (
    <EpisodeContext.Provider value={{episodeId, setEpisodeId}}>
            {children}
    </EpisodeContext.Provider>
)

}