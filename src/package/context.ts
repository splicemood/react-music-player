import {createContext} from 'react';
import {useGlobalAudioPlayerProps} from "@splicemood/react-music-player";

export const PlayerContext = createContext<useGlobalAudioPlayerProps<any>>(undefined as any);
