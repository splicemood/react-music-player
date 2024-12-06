import { parseWebStream } from 'music-metadata';
import { maxPercentage, metadataBytesLength } from '@/package/shared/consts';

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
      if (webStream === null) {
        reject('webStream is null');
        return;
      }

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

export const percentToValue = (percent: number) => {
  return Math.round(percent) / maxPercentage;
};
