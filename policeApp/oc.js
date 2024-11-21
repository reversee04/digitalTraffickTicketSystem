import Tesseract from 'tesseract.js';

export const processImageWithOCR = async (imageUri) => {
  try {
    const result = await Tesseract.recognize(imageUri, 'eng', {
      logger: (info) => console.log(info), // Logs OCR progress
    });

    console.log('OCR Result:', result.data.text);
    return result.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
};
