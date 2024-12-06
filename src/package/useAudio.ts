import { useContext } from 'react';
import { SongSource } from '@/package';
import { useGlobalAudioPlayerProps } from '@/package';
import { PlayerContext } from './context';

export const useAudio = <T extends SongSource>(): useGlobalAudioPlayerProps<T> => {
  const context = useContext<useGlobalAudioPlayerProps<T>>(PlayerContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an PlayerContext');
  }
  return context;
};
