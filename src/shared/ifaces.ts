import { LoopState } from './enums';

export interface AudioSource {
  src: string;
}

export interface useGlobalAudioPlayerProps<T extends AudioSource> {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  next: (forcePlay?: boolean) => void;
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
  replacePlaylist: (newPlaylist: T[], startFrom?: number) => void;
  setCurrentTrack: (index: number) => void;
  setVolumePercent: (percent: number) => void;
  setUpdateTime: (newTime: number) => void;
  setPlaylistId: (id: string | number) => void;

  volume: number;
  maxTime: number;
  volumePercent: number;
  bufferedPercentage: number;
  currentPlaylistId: string | number;
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
