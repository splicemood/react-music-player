import React from 'react';
import { Group, Kbd, Text } from '@mantine/core';

const Credits = () => {
  return (
    <Group justify={'space-between'}>
      <Text visibleFrom={'md'} c={'dimmed'} size={'xs'}>
        To show hotkeys press <Kbd size={'xs'}>Ctrl</Kbd>
        <Kbd size={'xs'}>/</Kbd>
      </Text>
      <Text c={'dark'}>Source: freesound.org (CC0)</Text>
    </Group>
  );
};

export default Credits;
