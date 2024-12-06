import { createContext } from 'react';
import { useGlobalAudioPlayerProps } from '@/package/useGlobalAudioPlayerProps';

export const PlayerContext = createContext<useGlobalAudioPlayerProps<any>>(undefined as any);
