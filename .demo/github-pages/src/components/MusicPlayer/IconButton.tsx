import React from 'react';
import { ActionIcon } from '@mantine/core';

type IconButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function IconButton({ onClick, children }: IconButtonProps) {
  return (
    <ActionIcon pb={'lg'} pt={'lg'} variant={'transparent'} color={'text'} onClick={onClick}>
      {children}
    </ActionIcon>
  );
}
