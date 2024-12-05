import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { ActionIcon, Group, Image, Title } from '@mantine/core';

const repository = 'https://github.com/splicemood/react-music-player';

const Welcome = () => {
  return (
    <Group gap={'xl'}>
      <Title order={3}>Music Player</Title>
      <ActionIcon
        size={'xl'}
        color={'white'}
        component={Link}
        to={repository}
        variant={'outline'}
        aria-label="Source code"
      >
        <FaGithub size={24} />
      </ActionIcon>
      {/*@ts-ignore*/}
      <Group component={Link} to={repository}>
        <Image alt="Static Badge" src="https://img.shields.io/badge/react-18.3.1-blue" />
        <Image
          alt="GitHub License"
          src="https://img.shields.io/github/license/splicemood/react-music-player"
        />
        <Image
          alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/splicemood/react-music-player"
        />
      </Group>
    </Group>
  );
};

export default Welcome;
