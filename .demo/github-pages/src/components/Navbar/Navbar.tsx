import React from 'react';
import { AppShell, ScrollArea } from '@mantine/core';
import { LinkButton } from '@/components/Navbar/LinkButton';

const navigation = [
  { label: 'Full Sync', to: '/react-music-player/#' },
  { label: 'Play/Pause Sync', to: '/react-music-player/#/playpause' },
  { label: 'No Sync', to: '/react-music-player/#/nosync' },
];

const navbar = navigation.map((route, index) => <LinkButton key={index} {...route} />);

const Navbar = () => {
  return (
    <AppShell.Navbar p="md">
      <AppShell.Section>Modes/Provider Usage</AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        {navbar}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default Navbar;
