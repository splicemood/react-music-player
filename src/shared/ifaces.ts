import { RefObject } from 'react';
import { LoopState } from '@/shared/enums';
import { SongMetadata } from '@/shared/types';

export interface useGlobalAudioPlayerProps {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  next: (preventPlay?: boolean) => void;
  previous: () => void;
  setVolume: (value: number) => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  shuffleOn: () => void;
  shuffleOff: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  addToPlaylist: (song: SongMetadata) => void;
  replacePlaylist: (newPlaylist: SongMetadata[]) => void;
  setCurrentTrack: (index: number) => void;
  setVolumePercent: (percent: number) => void;
  setUpdateTime: (newTime: number) => void;

  volume: number;
  maxTime: number;
  volumePercent: number;
  bufferedPercentage: number;
  playlist: SongMetadata[];
  durations: number[];
  isPlaying: boolean;
  currentTime: number;
  currentTrackIndex: number;
  repeatMode: LoopState;
  isShuffled: boolean;
  isLoading: boolean | undefined;
  isMuted: boolean;
}

export interface PlayListRowProps {
  cover?: string;
  onClick?: () => void;
  ref?: RefObject<HTMLDivElement>;
  isActive?: string | object;
  isPlaying?: boolean;
}

export interface PlayListProps {
  nextPlaylist: () => void;
  prevPlaylist: () => void;
}
