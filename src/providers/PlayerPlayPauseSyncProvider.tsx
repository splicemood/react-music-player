import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedState } from '@mantine/hooks';
import {
  debounceLoadingState,
  defaultVolume,
  defaultVolumePercent,
  firstElement,
  offsetTimeBumpToStart,
  step,
  truncateBackStackQueue,
} from '@/providers/consts';
import { PlayerContext } from '@/providers/context';
import { LoopState } from '@/shared/enums';
import { SongMetadata } from '@/shared/types';
import { fetchDuration } from '@/shared/util';

export const PlayerPlayPauseSyncProvider = ({ children }: any) => {
  // State variables
  const [isLoading, setIsLoading] = useDebouncedState<boolean | undefined>(
    undefined,
    debounceLoadingState
  );
  const [playlist, setPlaylist] = useState<SongMetadata[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(firstElement);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // currentTime is local state, to update time use setUpdateTime method instead
  const [currentTime, setCurrentTime] = useState<number>(firstElement);
  const [updatedTime, setUpdateTime] = useState<number>(0);

  const [volume, setVolume] = useState<number>(defaultVolume);
  const [volumePercent, setVolumePercent] = useState<number>(defaultVolumePercent);
  const [bufferedPercentage, setBufferedPercentage] = useState<number>(firstElement);
  const [maxTime, setMaxTime] = useState<number>(firstElement);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<LoopState>(LoopState.PlayAll);
  const [queue, setQueue] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const broadcastState = useCallback(
    (type: string, value?: any) => {
      if (channelRef.current) channelRef.current.postMessage({ type, value });
    },
    [channelRef.current]
  );

  useEffect(() => {
    if (isPlaying) {
      if (!isShuffled) {
        setQueue([]);
      } else {
        setQueue((prev) => {
          return [currentTrackIndex, ...prev];
        });
      }
    }
  }, [isShuffled]);

  useEffect(() => {
    const value = Math.round(volume * 100);
    setVolumePercent(value);
  }, [volume]);

  useEffect(() => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = updatedTime;
      setCurrentTime(updatedTime);
    }
  }, [updatedTime]);

  useEffect(() => {
    if (audioRef.current && playlist.length > firstElement) {
      const currentTrack = playlist[currentTrackIndex];
      audioRef.current.src = currentTrack?.src;
      audioRef.current.currentTime = firstElement;
    }
  }, [playlist, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current && playlist.length > firstElement) {
      if (isPlaying) {
        broadcastState('PAUSE_PLAYING');
        setIsLoading(true);
        audioRef.current
          .play()
          .then(() => {
            setIsLoading(undefined);
          })
          .catch(() => {
            setIsLoading(undefined);
          });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrackIndex, playlist, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (playlist.length > 0) {
      const songs = playlist.map((song) => song.src);
      fetchDuration(songs).then((durations) => {
        if (durations !== undefined) {
          setDurations(durations);
        }
      });
    }
  }, [playlist]);

  const handleTrackUpdateTime = useCallback(() => {
    if (audioRef.current !== null) {
      const value = audioRef.current.currentTime;
      setCurrentTime(value);
    }
  }, [setCurrentTime]);

  const handleTrackDurationChanged = useCallback(() => {
    if (audioRef.current !== null) {
      setMaxTime(audioRef.current.duration);
    }
  }, [audioRef.current?.duration]);

  const play = useCallback(() => {
    if (playlist.length === firstElement) return;
    setIsPlaying(true);
  }, [playlist]);

  const pause = useCallback(() => setIsPlaying(false), [setIsPlaying]);

  const togglePlayPause = useCallback(() => setIsPlaying((prev) => !prev), [setIsPlaying]);

  const next = useCallback(
    (loopPlaylist = false) => {
      if (playlist.length === firstElement) return;
      let nextIndex: number;
      if (isShuffled) {
        const indices = playlist.map((_, index) => index);
        const shuffleIndices = indices.filter((index) => index !== currentTrackIndex);
        nextIndex = shuffleIndices[Math.floor(Math.random() * shuffleIndices.length)];
        setQueue((prev) => {
          prev = prev.slice(firstElement, truncateBackStackQueue);
          return [nextIndex, ...prev];
        });
      } else {
        nextIndex = currentTrackIndex + step;
      }

      if (nextIndex >= playlist.length) {
        setIsPlaying(loopPlaylist);
        nextIndex = firstElement;

        if (!loopPlaylist) return;
      }

      setBufferedPercentage(firstElement);
      if (!isPlaying) setIsPlaying(true);

      setCurrentTrackIndex(nextIndex);
    },
    [playlist, currentTrackIndex, isShuffled, isPlaying, setCurrentTrackIndex]
  );

  const handleTrackEnded = useCallback(() => {
    switch (repeatMode) {
      case LoopState.PlayAll:
        next();
        break;
      case LoopState.LoopAll:
        next(true);
        break;
      case LoopState.LoopCue:
        audioRef.current?.play();
        break;
    }
  }, [repeatMode, next]);

  const previous = useCallback(() => {
    if (playlist.length === firstElement || !audioRef.current) return;
    if (currentTime > offsetTimeBumpToStart) {
      audioRef.current.currentTime = firstElement;
      return;
    }
    let prevIndex: number = firstElement;

    if (isShuffled) {
      if (queue.length === step) return;
      setQueue((prev) => {
        const [, ...other] = prev;
        prevIndex = other[firstElement];
        return other;
      });
    } else {
      prevIndex = currentTrackIndex - step;
    }

    if (prevIndex < firstElement) {
      prevIndex = playlist.length - step;
    }

    setCurrentTrackIndex(prevIndex);
    setBufferedPercentage(firstElement);
    setIsPlaying(true);
  }, [playlist, queue, currentTrackIndex, currentTime, setUpdateTime]);

  const setCurrentTrack = (newIndex: number) => setCurrentTrackIndex(newIndex);
  // 0-1 range value
  const setPlayerVolume = (value: number) => setVolume(value);
  // 0-100 range value
  const setPlayerPercentVolume = (percent: number) => {
    const value = Math.round((percent / 100) * 100) / 100;
    setVolume(value);
  };

  const mute = () => setIsMuted(true);
  const unmute = () => setIsMuted(false);
  const toggleMute = () => setIsMuted((prev) => !prev);

  const shuffleOn = () => setIsShuffled(true);
  const shuffleOff = () => setIsShuffled(false);
  const toggleShuffle = () => setIsShuffled((prev) => !prev);

  const toggleLoop = () => {
    setRepeatMode((prev) => {
      if (prev === LoopState.PlayAll) return LoopState.LoopAll;
      if (prev === LoopState.LoopAll) return LoopState.LoopCue;
      if (prev === LoopState.LoopCue) return LoopState.PlayAll;
      return LoopState.PlayAll;
    });
  };

  const addToPlaylist = (track: SongMetadata) => setPlaylist((prev) => [...prev, track]);

  const replacePlaylist = (newPlaylist: SongMetadata[]) => {
    pause();
    setQueue([firstElement]);
    setBufferedPercentage(firstElement);
    setPlaylist(newPlaylist);
    setCurrentTrackIndex(firstElement);
  };

  const handleBroadcastMessage = useCallback(
    (event: MessageEvent) => {
      const { data } = event;
      switch (data?.type) {
        case 'PAUSE_PLAYING':
          setIsPlaying(false);
          break;
      }
    },
    [isPlaying, setCurrentTrackIndex, setIsPlaying, currentTrackIndex]
  );

  const handleProgress = () => {
    if (audioRef.current && audioRef.current.buffered.length > 0) {
      const bufferedEnd = audioRef.current.buffered.end(audioRef.current.buffered.length - 1);
      setBufferedPercentage((bufferedEnd / audioRef.current.duration) * 100);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      setIsPlaying(false);
      audioRef.current.preload = 'metadata';
    }

    audioRef.current.addEventListener('progress', handleProgress);
    audioRef.current.addEventListener('timeupdate', handleTrackUpdateTime);
    audioRef.current.addEventListener('durationchange', handleTrackDurationChanged);
    audioRef.current.addEventListener('ended', handleTrackEnded);

    if ('BroadcastChannel' in window && !channelRef.current) {
      channelRef.current = new BroadcastChannel('playpause-audio-player');
      channelRef.current.onmessage = handleBroadcastMessage;
    }

    return () => {
      audioRef.current?.removeEventListener('progress', handleProgress);
      audioRef.current?.removeEventListener('timeupdate', handleTrackUpdateTime);
      audioRef.current?.removeEventListener('durationchange', handleTrackDurationChanged);
      audioRef.current?.removeEventListener('ended', handleTrackEnded);
    };
  }, [handleProgress, handleTrackEnded, handleTrackUpdateTime, handleTrackDurationChanged]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const value = {
    play,
    pause,
    togglePlayPause,
    next,
    previous,
    setVolume: setPlayerVolume,
    setVolumePercent: setPlayerPercentVolume,
    mute,
    unmute,
    toggleMute,
    shuffleOn,
    shuffleOff,
    toggleShuffle,
    toggleLoop,
    addToPlaylist,
    replacePlaylist,
    setCurrentTrack,
    setUpdateTime,

    volume,
    volumePercent,
    bufferedPercentage,
    maxTime,
    playlist,
    durations,
    isPlaying,
    currentTime,
    currentTrackIndex,
    repeatMode,
    isShuffled,
    isLoading,
    isMuted,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};
