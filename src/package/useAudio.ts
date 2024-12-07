import { useContext } from 'react';
import { AudioSource } from '@splicemood/react-music-player';
import { useGlobalAudioPlayerProps } from '@splicemood/react-music-player';
import { PlayerContext } from './context';

export const useAudio = <T extends AudioSource>(): useGlobalAudioPlayerProps<T> => {
  const context = useContext<useGlobalAudioPlayerProps<T>>(PlayerContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an PlayerContext');
  }
  return context;
};
