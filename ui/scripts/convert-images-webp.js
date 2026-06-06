import { glob } from 'glob';
import sharp from 'sharp';

const publicFolder = '../public/';

const main = async () => {
  const images = await glob([`${publicFolder}**/*.{png,jpeg,jpg}`, 'public/*.{png,jpeg}']);
  const conversionPromises = images.map(async (image) => {
    const output = image.split('.').slice(0, -1).join('.') + '.webp';
    console.log('Converting: ', image, ' to ', output);
    return sharp(image).toFile(output);
  });
  await Promise.all(conversionPromises);
};

await main();
