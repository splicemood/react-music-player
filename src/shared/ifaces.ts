import React, { LegacyRef, RefObject } from 'react';

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

export interface RecordingProps {
  id: number;
  cover?: string;
  author?: string;
  title?: string;
  setControlRef: (name: number) => LegacyRef<HTMLDivElement> | undefined;
  setActive: (index: number) => void;
  togglePlayPause: () => void;
  play: () => void;
  active: number;
  isPlaying?: boolean;
  children?: React.ReactNode;
}
