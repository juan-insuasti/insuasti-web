import { glob } from 'glob';
import sharp from 'sharp';

const resizeFolder = '../public/textures/';
const RESIZE_WIDTH = 256;

const main = async () => {
  const images = await glob([`${resizeFolder}**/*.{png,jpeg,jpg}`, 'public/*.{png,jpeg}']);
  const conversionPromises = images.map(async (image) => {
    const output = image.split('.').slice(0, -1).join('.') + '.webp';
    console.log('Resizing: ', image, ' to ', output);
    return sharp(image).resize(RESIZE_WIDTH).toFile(output);
  });
  await Promise.all(conversionPromises);
};

await main();
