import React from 'react';
import { IconCode, IconEye } from '@tabler/icons-react';
import { Center, rem, SegmentedControl } from '@mantine/core';

const Control = (props: { value: string; onChange: (newValue: string) => void }) => {
  return (
    <SegmentedControl
      {...props}
      data={[
        {
          value: 'preview',
          label: (
            <Center style={{ gap: 10 }}>
              <IconEye style={{ width: rem(16), height: rem(16) }} />
              <span>Preview</span>
            </Center>
          ),
        },
        {
          value: 'code',
          label: (
            <Center style={{ gap: 10 }}>
              <IconCode style={{ width: rem(16), height: rem(16) }} />
              <span>Code</span>
            </Center>
          ),
        },
      ]}
    />
  );
};

export default Control;
