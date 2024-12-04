import React, { useCallback, useEffect, useState } from 'react';
import { Kbd, Stack, Text, Title } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import HotKeys from '@/components/MusicPlayer/HotKeys/HotKeys';
import PlayList from '@/components/MusicPlayer/PlayList/PlayList';
import { Layout } from '@/pages/Layout';
import { useAudio } from '@/providers/useAudio';
import { SongMetadata } from '@/shared/types';
import Credits from '@/components/Credits/Credits';

const NoSyncPage = () => {
  const audio = useAudio();
  const [playlistNumber, setPlaylistNumber] = useState<number>(1);
  const fetchSongsMetadata = (index: number) => {
    fetch(`tracks_${index}.json`)
      .then((res) => res.json())
      .then((res: SongMetadata[]) => {
        audio.replacePlaylist(res);
      });
  };

  useEffect(() => {
    fetchSongsMetadata(playlistNumber);
  }, [playlistNumber]);

  const handleNextPlaylist = useCallback(() => {
    let next = playlistNumber + 1;
    if (next > 3) next = 1;
    setPlaylistNumber(next);
  }, [playlistNumber]);

  const handlePrevPlaylist = useCallback(() => {
    let next = playlistNumber - 1;
    if (next < 1) next = 3;
    setPlaylistNumber(next);
  }, [playlistNumber]);

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);

  useHotkeys([
    ['alt+ArrowLeft', handlePrevPlaylist],
    ['alt+ArrowRight', handleNextPlaylist],
    ['mod+Slash', openModal],
  ]);

  return (
    <Layout>
      <Stack gap={'xs'}>
        <Title order={2}>No Sync Demo</Title>
        <HotKeys opened={openedModal} close={closeModal} />
        <PlayList nextPlaylist={handleNextPlaylist} prevPlaylist={handlePrevPlaylist} />
       <Credits/>
      </Stack>
    </Layout>
  );
};

export default NoSyncPage;
