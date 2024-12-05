import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Image } from '@mantine/core';
import { repository } from '@/shared/consts';

const Badges = () => {
  return (
    // @ts-ignore
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
  );
};

export default Badges;
