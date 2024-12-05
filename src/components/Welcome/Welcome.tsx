import React from 'react';
import { FaGithub } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { ActionIcon, Group, Image, Title } from '@mantine/core';
import { repository } from '@/shared/consts';

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
    </Group>
  );
};

export default Welcome;
