import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { ActionIcon, Group, Title } from '@mantine/core';

const Welcome = () => {
  return (
    <Group gap={'xl'}>
      <Title order={3}>Music Player</Title>
      <ActionIcon
        component={Link}
        to={'https://github.com/splicemood/react-music-player'}
        variant={'outline'}
        color={'text'}
        aria-label="Source code"
      >
        <FaGithub size={20} />
      </ActionIcon>
    </Group>
  );
};

export default Welcome;
