import { createContext } from 'react';
import { useGlobalAudioPlayerProps } from '@/shared/ifaces';

// @ts-ignore
export const PlayerContext = createContext<useGlobalAudioPlayerProps>();
