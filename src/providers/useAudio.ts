import { useContext } from 'react';
import { PlayerContext } from '@/providers/context';

export const useAudio = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an PlayerContext');
  }
  return context;
};
