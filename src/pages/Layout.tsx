import React from 'react';
import { AppShell, Burger, Container, Group } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import GlobalAudioPlayer from '@/components/MusicPlayer/GlobalAudioPlayer';
import Navbar from '@/components/Navbar/Navbar';
import Welcome from '@/components/Welcome/Welcome';
import { maxVolume, minTime, minVolume, timeStep, volumeStep } from '@/providers/consts';
import { useAudio } from '@/providers/useAudio';

export function Layout({ children }: any) {
  const audio = useAudio();

  useHotkeys([
    ['Space', audio.togglePlayPause],
    [
      'ArrowLeft',
      () => {
        if (audio.currentTime === minTime) return;
        const newTime = audio.currentTime - timeStep;
        if (newTime < minTime) {
          audio.setUpdateTime(minTime);
          return;
        }
        audio.setUpdateTime(newTime);
      },
    ],
    [
      'ArrowRight',
      () => {
        if (audio.currentTime === audio.maxTime) return;
        const newTime = audio.currentTime + timeStep;
        if (newTime > audio.maxTime) {
          audio.setUpdateTime(audio.maxTime);
          return;
        }
        audio.setUpdateTime(newTime);
      },
    ],
    [
      'ArrowUp',
      () => {
        if (audio.volumePercent === maxVolume) return;
        const newVolume = audio.volumePercent + volumeStep;
        if (newVolume > maxVolume) {
          audio.setVolumePercent(maxVolume);
          return;
        }
        audio.setVolumePercent(newVolume);
      },
    ],
    [
      'ArrowDown',
      () => {
        if (audio.volumePercent === minVolume) return;
        const newVolume = audio.volumePercent - volumeStep;
        if (newVolume < minVolume) {
          audio.setVolumePercent(minVolume);
          return;
        }
        audio.setVolumePercent(newVolume);
      },
    ],
    ['mod+ArrowLeft', audio.previous],
    ['mod+ArrowRight', () => audio.next(true)],
    ['L', audio.toggleLoop],
    ['M', audio.toggleMute],
    ['S', audio.toggleShuffle],
  ]);

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={'md'}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" flex={0} />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
            flex={0}
          />
          <Welcome />
        </Group>
      </AppShell.Header>
      <Navbar />
      <AppShell.Main>
        <Container>{children}</Container>
      </AppShell.Main>
      <AppShell.Footer>
        <GlobalAudioPlayer />
      </AppShell.Footer>
    </AppShell>
  );
}
