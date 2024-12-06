import { Time } from '@/shared/types';

export function secondsToMinutesAndSeconds(time: number): Time {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const padSeconds = padNumber(seconds);

  return { minutes, seconds, padSeconds };
}

export function padNumber(value: number) {
  return value.toString().padStart(2, '0');
}
