import React from 'react';
import {Link} from 'react-router-dom';
import {Group, Image} from '@mantine/core';
import {repository} from '@/shared/consts';

const Badges = () => {
  return (
    // @ts-ignore
    <Group component={Link} to={repository}>
      <Image
        alt="React Version"
        src="https://img.shields.io/npm/dependency-version/%40splicemood%2Freact-music-player/react"
      />
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
