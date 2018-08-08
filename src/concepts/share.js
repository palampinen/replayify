import { slice, uniq } from 'lodash';

import { getPlayHistoryImages } from './play-history';
import { getArtistImages, getTrackImages } from './top-history';
import PlaylistTypes from '../constants/PlaylistTypes';

const GOLDEN_RATIO = 1.61803398875;
const BASE_IMG_SIZE = 640;
const IMG_COUNT = 6;

export const downloadCoverImages = type => (dispatch, getState) => {
  let images = [];
  let filename = '';

  switch (type) {
    case PlaylistTypes.ARTIST: {
      images = getArtistImages(getState());
      filename = 'Top-artists';
      break;
    }

    case PlaylistTypes.TRACK: {
      images = getTrackImages(getState());
      filename = 'Top-tracks';
      break;
    }

    case PlaylistTypes.RECENT: {
      images = getPlayHistoryImages(getState());
      filename = 'Recent-tracks';
      break;
    }

    default: {
      break;
    }
  }

  if (!images.size) {
    return;
  }

  // unique and slice
  const imageArray = slice(uniq(images.toJS()), 0, IMG_COUNT);

  const imageElements = imageArray.map(src => {
    const imageElement = new Image();

    imageElement.crossOrigin = '';
    imageElement.src = src;

    return imageElement;
  });

  let imageLoadCounter = 0;

  imageElements.map(
    imageElement =>
      (imageElement.onload = () => {
        imageLoadCounter++;

        if (imageLoadCounter === imageElements.length) {
          const dataUrl = goldenRatioImage(imageElements);
          downloadImage(dataUrl, filename);
        }
      })
  );

  return null;
};

const goldenRatioImage = images => {
  // create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // calclulate canvas size
  canvas.width = BASE_IMG_SIZE * GOLDEN_RATIO;
  canvas.height = BASE_IMG_SIZE;

  // fill with white
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Image 1
  drawCroppedImage(ctx, images[0], 0, 0, BASE_IMG_SIZE, BASE_IMG_SIZE);

  // Image 2
  const img2size = BASE_IMG_SIZE / GOLDEN_RATIO;
  drawCroppedImage(ctx, images[1], BASE_IMG_SIZE, BASE_IMG_SIZE - img2size, img2size, img2size);

  // Image 3
  const img3size = BASE_IMG_SIZE - img2size;
  drawCroppedImage(ctx, images[2], BASE_IMG_SIZE * GOLDEN_RATIO - img3size, 0, img3size, img3size);

  // Image 4
  const img4size = img2size - img3size;
  drawCroppedImage(ctx, images[3], BASE_IMG_SIZE, 0, img4size, img4size);

  // Image 5
  const img5size = img3size - img4size;
  drawCroppedImage(ctx, images[4], BASE_IMG_SIZE, img4size, img5size, img5size);

  // Image 6
  const img6 = images[5];
  const img6width = img4size - img5size;
  const img6height = img5size;
  drawCroppedImage(ctx, img6, BASE_IMG_SIZE + img5size, img4size, img6width, img6height);

  return canvas.toDataURL('image/jpeg', 0.7);
};

const downloadImage = (dataUrl, filename) => {
  var link = document.createElement('a');
  link.download = `${filename}.jpg`;
  link.href = dataUrl;
  link.click();

  link.remove();
};

const drawCroppedImage = (ctx, image, x, y, width, height) => {
  if (!image) {
    return;
  }

  const originalWidth = image.width;
  const originalHeight = image.height;
  const fromRatio = originalWidth / originalHeight;
  const toRatio = width / height;

  let sx, sy, cropWidth, cropHeight;

  if (fromRatio > toRatio) {
    cropWidth = originalHeight * toRatio;
    cropHeight = originalHeight;
    sx = (originalWidth - cropWidth) / 2;
    sy = 0;
  } else {
    cropWidth = originalWidth;
    cropHeight = originalWidth / toRatio;
    sx = 0;
    sy = (originalHeight - cropHeight) / 2;
  }

  return ctx.drawImage(image, sx, sy, cropWidth, cropHeight, x, y, width, height);
};
