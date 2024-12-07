import { useMemo } from 'react';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DurationProps } from '@/shared/types';
import { secondsToMinutesAndSeconds } from '@/shared/util';

const minus = '-';

export default function Duration({ time, seconds, maxTime }: DurationProps) {
  const [mode, { toggle }] = useDisclosure(false);

  const duration = useMemo(() => {
    if (mode) {
      const value = maxTime - seconds;
      return secondsToMinutesAndSeconds(value);
    } else {
      return time;
    }
  }, [mode, time, seconds, maxTime]);

  return (
    <Text c={'dimmed'} mt={'lg'} className={'identityText'} onClick={toggle}>
      {mode && minus}
      {duration.minutes}:{duration.padSeconds}
    </Text>
  );
}
