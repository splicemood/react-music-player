import React from 'react';
import { Link } from 'react-router-dom';
import { Group, Image } from '@mantine/core';
import { registry, repository } from '@/shared/consts';

const Badges = () => {
  return (
    // @ts-ignore
    <Group>
      <Link to={registry}>
        <Image
          alt="React Version"
          src="https://img.shields.io/npm/dependency-version/%40splicemood%2Freact-music-player/peer/react?style=for-the-badge"
        />
      </Link>
      <Link to={repository}>
        <Image
          alt="GitHub License"
          src="https://img.shields.io/github/license/splicemood/react-music-player?style=for-the-badge"
        />
      </Link>
      <Link to={registry}>
        <Image
          alt="Package Downloads"
          src="https://img.shields.io/npm/dm/%40splicemood%2Freact-music-player?style=for-the-badge"
        />
      </Link>
      <Link to={repository}>
        <Image
          alt="GitHub Repo stars"
          src="https://img.shields.io/github/stars/splicemood/react-music-player?style=for-the-badge"
        />
      </Link>
    </Group>
  );
};

export default Badges;
