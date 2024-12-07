export type SongMetadata = {
  id?: number;
  cover?: string;
  title?: string;
  author?: string;
  src: string;
};

export type Time = { minutes: number; seconds: number; padSeconds: string };

export interface TimeDisplayProps {
  time: Time;
}

export interface DurationProps extends TimeDisplayProps {
  maxTime: number;
  seconds: number;
}
