import {LoopState} from '@/package';

export interface SongSource {
  src: string;
}

export interface useGlobalAudioPlayerProps<T extends SongSource> {
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
  addToPlaylist: (song: T) => void;
  replacePlaylist: (newPlaylist: T[]) => void;
  setCurrentTrack: (index: number) => void;
  setVolumePercent: (percent: number) => void;
  setUpdateTime: (newTime: number) => void;

  volume: number;
  maxTime: number;
  volumePercent: number;
  bufferedPercentage: number;
  playlist: T[];
  durations: number[];
  isPlaying: boolean;
  currentTime: number;
  currentTrackIndex: number;
  repeatMode: LoopState;
  isShuffled: boolean;
  isLoading: boolean | undefined;
  isMuted: boolean;
}
