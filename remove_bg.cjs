const Jimp = require('jimp');

async function removeBackground() {
  const imagePath = '/Users/carlosvega05/.gemini/antigravity-ide/brain/70cb3227-7a89-470c-8a9d-980435e07d82/media__1780593550691.jpg';
  const outPath = '/Users/carlosvega05/Desktop/Web side Rodrigo/src/assets/ventrix-logo-transparent.png';
  
  console.log("Reading image...");
  try {
    const image = await Jimp.read(imagePath);
    
    // Get background color from top-left pixel
    const bgColorInt = image.getPixelColor(0, 0);
    const bgColor = Jimp.intToRGBA(bgColorInt);
    console.log("Detected background color:", bgColor);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const dist = Math.abs(r - bgColor.r) + Math.abs(g - bgColor.g) + Math.abs(b - bgColor.b);
      
      // If it's close to the background color, make it transparent
      if (dist < 50) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    
    await image.writeAsync(outPath);
    console.log("Image saved to", outPath);
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

removeBackground();
