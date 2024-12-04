import React from 'react';
import Waves from '@dschoon/react-waves';

type WaveFormProps = {
  src: string;
  volume: number;
  isPlaying: boolean;
};

const WaveForm = ({ src, volume, isPlaying }: WaveFormProps) => {
  return (
    // @ts-ignore
    <Waves
      audioFile={src}
      className={'react-waves'}
      options={{
        barHeight: 1,
        cursorWidth: 0,
        height: 80,
        normalize: true,
        hideScrollbar: true,
        responsive: true,
        progressColor: '#5ca7d1',
        waveColor: '#D1D6DA',
      }}
      volume={volume}
      zoom={1}
      playing={isPlaying}
    />
  );
};

export default WaveForm;
