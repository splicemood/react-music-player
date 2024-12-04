import { Time } from '@/shared/types';
import { metadataBytesLength } from '@/providers/consts';
import { parseWebStream } from 'music-metadata';

export function secondsToMinutesAndSeconds(time: number): Time {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const padSeconds = padNumber(seconds);

  return { minutes, seconds, padSeconds };
}

export function padNumber(value: number) {
  return value.toString().padStart(2, '0');
}

function getDurationNative(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const handleLoaded = () => {
      resolve(audio.duration);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audio.remove();
    };
    const handleError = (e: ErrorEvent) => {
      reject(e);
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audio.remove();
    };
    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('error', handleError);
    audio.src = url;
  });
}

const getAudioDuration = (url: string): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        headers: { Range: 'bytes=0-' + metadataBytesLength },
      });
      if (!response.ok) {
        reject(`HTTP error! status: ${response.status}`);
      }
      const acceptRanges = response.headers.get('Accept-Ranges');
      if (acceptRanges !== 'bytes') {
        reject('Server does not support range requests.');
      }
      const webStream = response.body;

      const metadata = await parseWebStream(webStream, 'audio/mpeg');

      if (metadata.format.duration) {
        resolve(metadata.format.duration);
      } else {
        const duration = await getDurationNative(url);
        resolve(duration);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchDuration = (songs: string[]): Promise<void | number[]> =>
  Promise.all(songs.map(getAudioDuration)).catch((errors) => {
    console.error('Errors occurred while fetching durations:', errors);
  });
