import { useMemo } from 'react';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';
import { ActionIcon } from '@mantine/core';
import IconButton from './IconButton';

type PlayButtonProps = {
  playing: boolean;
  onClick: () => void;
};

export default function PlayButton({ onClick, playing }: PlayButtonProps) {
  const IconPlay = useMemo(() => {
    return playing ? FaCirclePause : FaCirclePlay;
  }, [playing]);

  return (
    <ActionIcon color={"text"} variant={"transparent"} size={"lg"} onClick={onClick} >
      <IconPlay size={40}/>
    </ActionIcon>
  );
}
