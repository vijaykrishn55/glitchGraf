import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { getLandmarksInRadius } from './geolocation'; // We'll implement next

const IMAGE_SIZE = 224; // MobileNet input size
let model = null;

export const loadModel = async () => model || (model = await mobilenet.load());

export const processImage = async (imgElement) => {
  // Convert to tensor and resize
  const tensor = tf.browser.fromPixels(imgElement)
    .resizeNearestNeighbor([IMAGE_SIZE, IMAGE_SIZE])
    .toFloat();
  
  // Normalize and add batch dimension
  const normalized = tensor.div(255.0).expandDims();
  return normalized;
};

export const recognizeLandmark = async (imgElement, userLocation) => {
  try {
    const [model, processedImg] = await Promise.all([
      loadModel(),
      processImage(imgElement)
    ]);
    
    // Get image embeddings
    const embeddings = model.infer(processedImg, 'conv_preds');
    const embeddingArray = await embeddings.array();
    
    // Get nearby landmarks (50m radius)
    const landmarks = await getLandmarksInRadius(userLocation, 0.05); 
    
    // Find best match
    let bestMatch = null;
    let highestSimilarity = 0;
    
    landmarks.forEach(landmark => {
      const similarity = cosineSimilarity(embeddingArray[0], landmark.embeddings);
      if (similarity > 0.7 && similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = landmark;
      }
    });
    
    tf.dispose([processedImg, embeddings]);
    return bestMatch;
  } catch (error) {
    console.error('Recognition error:', error);
    return null;
  }
};

// Efficient cosine similarity calculation
const cosineSimilarity = (a, b) => {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};