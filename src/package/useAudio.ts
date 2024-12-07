import { useContext } from 'react';
import { PlayerContext } from './context';
import { AudioSource, useGlobalAudioPlayerProps } from './shared/ifaces';

export const useAudio = <T extends AudioSource>(): useGlobalAudioPlayerProps<T> => {
  const context = useContext<useGlobalAudioPlayerProps<T>>(PlayerContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an PlayerContext');
  }
  return context;
};
