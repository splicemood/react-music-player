import { Text } from '@mantine/core';
import { TimeDisplayProps } from '@/shared/types';
import classes from './MusicPlayer.module.css';

export default function TimeDisplayLabel({ time }: TimeDisplayProps) {
  return (
    <Text c={'dimmed'} className={classes.playlistText}>
      {time.minutes}:{time.padSeconds}
    </Text>
  );
}
