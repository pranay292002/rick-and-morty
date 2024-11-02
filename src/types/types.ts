import { Dispatch, ReactNode, SetStateAction } from "react";


interface CharacterCardProps {
    url: string;
  }


interface EpisodeIdContextType {
    episodeId: number;
    setEpisodeId: Dispatch<SetStateAction<number>>;
}

interface EpisodeProviderProps {
  children : ReactNode
}

interface EpisodeType {
  name: string,
  id:number
}
export type {CharacterCardProps, EpisodeIdContextType, EpisodeProviderProps, EpisodeType}