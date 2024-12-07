import React, { useCallback, useEffect, useState } from 'react';
import { useAudio } from '@splicemood/react-music-player';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Stack, Title } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { TypeScriptIcon } from '@mantinex/dev-icons';
import Badges from '@/components/Badges/Badges';
import Control from '@/components/Control/Control';
import Credits from '@/components/Credits/Credits';
import HotKeys from '@/components/MusicPlayer/HotKeys/HotKeys';
import PlayList from '@/components/MusicPlayer/PlayList/PlayList';
import { Layout } from '@/pages/Layout';
import { codeHookUsage, codePlayPauseSync } from '@/shared/consts';
import { SongMetadata } from '@/shared/types';

const PlayPausePage = () => {
  const audio = useAudio<SongMetadata>();
  const [playlistNumber, setPlaylistNumber] = useState<number>(1);
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [previewCode, setPreviewCode] = useState<string>('preview');
  const fetchSongsMetadata = (index: number) => {
    fetch(`tracks_${index}.json`)
      .then((res) => res.json())
      .then((res: SongMetadata[]) => {
        audio.replacePlaylist(res);
      });
  };

  const tsIcon = <TypeScriptIcon size={18} />;

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
          <Title order={2}>Play/Pause Sync Demo</Title>
        </Stack>
        <HotKeys opened={openedModal} close={closeModal} />
        {previewCode === 'preview' ? (
          <PlayList nextPlaylist={handleNextPlaylist} prevPlaylist={handlePrevPlaylist} />
        ) : (
          <CodeHighlightTabs
            code={[
              {
                fileName: 'main.tsx',
                code: codePlayPauseSync,
                language: 'tsx',
                icon: tsIcon,
              },
              {
                fileName: 'App.tsx',
                code: codeHookUsage,
                language: 'tsx',
                icon: tsIcon,
              },
            ]}
          />
        )}
        <Control value={previewCode} onChange={setPreviewCode} />
        <Credits />
      </Stack>
    </Layout>
  );
};

export default PlayPausePage;
