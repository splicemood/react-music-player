import { Divider, Kbd, Modal, SimpleGrid, Stack, Text } from '@mantine/core';

const HotKeys = ({ opened, close }: { opened: boolean; close: () => void }) => {
  return (
    <Modal opened={opened} onClose={close} title="Hot keys 🔥⌨" withCloseButton={false}>
      <Stack>
        <Text fw={'500'} c={'dimmed'}>
          Basic
        </Text>
        <SimpleGrid cols={2}>
          <Text>Loop</Text>
          <div dir="ltr">
            <Kbd>L</Kbd>
          </div>
          <Text>Shuffle</Text>
          <div dir="ltr">
            <Kbd>S</Kbd>
          </div>
          <Text>Mute</Text>
          <div dir="ltr">
            <Kbd>M</Kbd>
          </div>
          <Text>Volume up</Text>
          <div dir="ltr">
            <Kbd>↑</Kbd>
          </div>
          <Text>Volume down</Text>
          <div dir="ltr">
            <Kbd>↓</Kbd>
          </div>
        </SimpleGrid>
        <Divider />
        <Text fw={'500'} c={'dimmed'}>
          Playing
        </Text>
        <SimpleGrid cols={2}>
          <Text>Play/Pause</Text>
          <div dir="ltr">
            <Kbd>Space</Kbd>
          </div>
          <Text>Fast-forward 5 seconds</Text>
          <div dir="ltr">
            <Kbd>→</Kbd>
          </div>
          <Text>Rewind 5 seconds</Text>
          <div dir="ltr">
            <Kbd>←</Kbd>
          </div>
          <Text>Next track</Text>
          <div dir="ltr">
            <Kbd>Ctrl</Kbd> <Kbd>→</Kbd>
          </div>
          <Text>Previous track</Text>
          <div dir="ltr">
            <Kbd>Ctrl</Kbd> <Kbd>←</Kbd>
          </div>
        </SimpleGrid>
        <Divider />
        <Text fw={'500'} c={'dimmed'}>
          Playlist
        </Text>
        <SimpleGrid cols={2}>
          <Text>Next playlist</Text>
          <div dir="ltr">
            <Kbd>Alt</Kbd> <Kbd>→</Kbd>
          </div>
          <Text>Previous playlist</Text>
          <div dir="ltr">
            <Kbd>Alt</Kbd> <Kbd>←</Kbd>
          </div>
        </SimpleGrid>
      </Stack>
    </Modal>
  );
};

export default HotKeys;
