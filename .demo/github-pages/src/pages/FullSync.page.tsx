import { useCallback, useEffect, useState } from 'react';
import { useAudio } from '@splicemood/react-music-player';
import { Stack, Title } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import Badges from '@/components/Badges/Badges';
import Credits from '@/components/Credits/Credits';
import HotKeys from '@/components/MusicPlayer/HotKeys/HotKeys';
import PlayList from '@/components/MusicPlayer/PlayList/PlayList';
import { Layout } from '@/pages/Layout';
import { SongMetadata } from '@/shared/types';

const HomePage = () => {
  const audio = useAudio<SongMetadata>();
  const [playlistNumber, setPlaylistNumber] = useState<number>(
    Number(audio.currentPlaylistId) || 1
  );

  const fetchSongsMetadata = (index: number) => {
    fetch(`tracks_${index}.json`)
      .then((res) => res.json())
      .then(audio.replacePlaylist);
  };

  useEffect(() => {
    fetchSongsMetadata(playlistNumber);
    audio.setPlaylistId(playlistNumber);
  }, [playlistNumber]);

  useEffect(() => {
    if (audio.currentPlaylistId) {
      setPlaylistNumber(Number(audio.currentPlaylistId));
    }
  }, [audio.currentPlaylistId]);

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
        <Stack>
          <Badges />
          <Title order={2}>Full Sync Demo</Title>
        </Stack>
        <HotKeys opened={openedModal} close={closeModal} />
        <PlayList nextPlaylist={handleNextPlaylist} prevPlaylist={handlePrevPlaylist} />
        <Credits />
      </Stack>
    </Layout>
  );
};

export default HomePage;
