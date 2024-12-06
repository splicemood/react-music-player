import {createContext} from 'react';
import {useGlobalAudioPlayerProps} from "@/package/shared/ifaces";

export const PlayerContext = createContext<useGlobalAudioPlayerProps<any>>(undefined as any);
