import { useCallback, useEffect, useMemo, useState } from 'react';

import './MusicPlayer.css';
import './Loader.css';

import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import {
  ActionIcon,
  Box,
  Container,
  CSSProperties,
  Flex,
  Group,
  Image,
  Slider,
  Stack,
  Text,
  useMatches,
} from '@mantine/core';
import Duration from '@/components/MusicPlayer/Duration';
import IconButton from '@/components/MusicPlayer/IconButton';
import PlayButton from '@/components/MusicPlayer/PlayButton';
import TimeDisplayLabel from '@/components/MusicPlayer/TimeDisplayLabel';
import { LoopState } from '@/package/shared/enums';
import { useAudio } from '@/package/useAudio';
import { SongMetadata, Time } from '@/shared/types';
import { secondsToMinutesAndSeconds } from '@/shared/util';

const debouncePassUpdateUnlock = 50;
const fallbackSrc = '/react-music-player/icons/thumbnail.svg';

const GlobalAudioPlayer = () => {
  const audio = useAudio<SongMetadata>();
  const [passUpdate, setPassUpdate] = useState(true);
  const [currentTime, setCurrentTime] = useState<Time>(secondsToMinutesAndSeconds(0));
  const [maxTime, setMaxTime] = useState<Time>(secondsToMinutesAndSeconds(0));
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (passUpdate) {
      if (!audio.currentTime || !audio.maxTime) {
        setSliderValue(0);
      } else {
        setSliderValue(audio.currentTime);
      }
    }
    setCurrentTime(secondsToMinutesAndSeconds(audio.currentTime));
  }, [audio.currentTime]);

  useEffect(() => {
    setMaxTime(secondsToMinutesAndSeconds(audio.maxTime));
  }, [audio.maxTime]);

  const onPlayButtonClick = audio.togglePlayPause;

  const allowUpdate = () => setPassUpdate(false);

  const updateTime = (value: number) => {
    setSliderValue(value);
  };

  const applyTime = useCallback(
    (value: number) => {
      audio.setUpdateTime(value);
      setTimeout(() => setPassUpdate(true), debouncePassUpdateUnlock);
    },
    [audio.maxTime]
  );

  const onNextButtonClick = useCallback(() => audio.next(true), [audio.next]);
  const onPrevButtonClick = useCallback(audio.previous, [audio.previous]);
  const toggleShuffle = audio.toggleShuffle;
  const toggleRepeat = audio.toggleLoop;
  const onVolumeChange = (value: number) => {
    audio.setVolume(value);
  };

  const shuffleIcon = useMemo(() => {
    return audio.isShuffled ? 'icons/shuffle.svg' : 'icons/shuffle-disabled.svg';
  }, [audio.isShuffled]);

  const repeatIcon = useMemo(() => {
    switch (audio.repeatMode) {
      case LoopState.PlayAll:
        return 'icons/repeat.svg';
      case LoopState.LoopAll:
        return 'icons/repeat-all.svg';
      case LoopState.LoopCue:
        return 'icons/repeat-one.svg';
    }
  }, [audio.repeatMode]);

  const source = useMemo(() => {
    return audio.playlist?.length > 0 ? audio.playlist?.[audio.currentTrackIndex]?.cover : '';
  }, [audio.playlist, audio.currentTrackIndex]);
  const title = useMemo(() => {
    return audio.playlist?.length > 0 && audio.playlist[audio.currentTrackIndex]?.title;
  }, [audio.playlist, audio.currentTrackIndex]);
  const author = useMemo(() => {
    return audio.playlist?.length > 0 && audio.playlist[audio.currentTrackIndex]?.author;
  }, [audio.playlist, audio.currentTrackIndex]);
  const MuteIcon = useMemo(() => {
    return audio.isMuted ? FaVolumeMute : FaVolumeUp;
  }, [audio.isMuted]);
  const renderLabel = (value: number) =>
    TimeDisplayLabel({ time: secondsToMinutesAndSeconds(value) });

  const dir = useMatches<CSSProperties['flexDirection']>({
    base: 'column-reverse',
    md: 'row',
  });

  const playPauseGap = useMatches({
    base: 'lg',
    md: 4,
  });

  const sliderCoverGap = useMatches({
    base: 0,
    md: 'xs',
  });

  const sliderGap = useMatches({
    base: 0,
    md: 'lg',
  });

  const buttons = useMemo(() => {
    const playAndShuffle = [
      <Group gap={playPauseGap} key={'controls-button'}>
        <IconButton onClick={onPrevButtonClick} children={<IoPlaySkipBack size={22} />} />
        <PlayButton onClick={onPlayButtonClick} playing={audio.isPlaying} />
        <IconButton onClick={onNextButtonClick} children={<IoPlaySkipForward size={22} />} />
      </Group>,
      <IconButton onClick={toggleShuffle} key={'shuffle-button'}>
        <img src={shuffleIcon} alt="shuffle" className="icon" />
      </IconButton>,
    ];

    if (dir === 'row') {
      return playAndShuffle;
    } else {
      return playAndShuffle.reverse();
    }
  }, [
    dir,
    playPauseGap,
    onPrevButtonClick,
    onPlayButtonClick,
    audio.isPlaying,
    onNextButtonClick,
    toggleShuffle,
    shuffleIcon,
  ]);

  return (
    audio.playlist?.length > 0 && (
      <Container p={'xs'}>
        <Flex direction={dir} gap={sliderGap}>
          <Group gap={'xs'}>
            {buttons}

            <IconButton onClick={toggleRepeat}>
              <img src={repeatIcon} alt="repeat" className="icon" />
            </IconButton>
          </Group>

          <Stack gap={sliderCoverGap} flex={1}>
            <Group visibleFrom={'md'} justify={'space-between'} miw={300}>
              <Image
                className={'music-cover-art'}
                src={source || fallbackSrc}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = fallbackSrc;
                }}
                alt={'cover art'}
              />
              <Box flex={1}>
                <Box miw={180}>
                  <Text className={'identityText'} fw={500} component={'h5'} truncate>
                    {title}
                  </Text>
                  <Text className={'identityText'} c={'dimmed'} component={'h6'} truncate>
                    {author}
                  </Text>
                </Box>
              </Box>
              <Duration time={currentTime} seconds={audio.currentTime} maxTime={audio.maxTime} />
            </Group>
            <Group align={'center'}>
              <Slider
                flex={1}
                min={0}
                style={{ '--progress-bar': audio.bufferedPercentage + '%' }}
                data-loading={audio.isLoading}
                data-timer={true}
                max={audio.maxTime}
                showLabelOnHover={false}
                label={renderLabel}
                value={sliderValue}
                color="blue"
                onMouseDown={allowUpdate}
                onTouchStart={allowUpdate}
                onDragStart={allowUpdate}
                onChange={updateTime}
                onChangeEnd={applyTime}
                onFocus={(e) => e.target.blur()}
              />
            </Group>
            <Group hiddenFrom={'md'} justify={'space-between'}>
              <TimeDisplayLabel time={currentTime} />
              <TimeDisplayLabel time={maxTime} />
            </Group>
          </Stack>

          <Group visibleFrom={'md'} align={'center'} gap={'xs'} mb={5}>
            <ActionIcon color={'text'} variant={'transparent'} onClick={audio.toggleMute}>
              <MuteIcon size={20} />
            </ActionIcon>

            <Slider
              w={100}
              min={0}
              step={0.005}
              max={1}
              label={() => audio.volumePercent + ' %'}
              onFocus={(e) => e.target.blur()}
              value={audio.volume}
              onChange={onVolumeChange}
              onChangeEnd={onVolumeChange}
            />
          </Group>
        </Flex>
      </Container>
    )
  );
};

export default GlobalAudioPlayer;
