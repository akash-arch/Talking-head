import { useState, useCallback } from "react";
import { FaceDetection, Results } from "@mediapipe/face_detection";

export const useFaceDetection = () => {
  const [hasFace, setHasFace] = useState<boolean | null>(null);

  const detectFace = useCallback(async (imageUrl: string) => {
    const faceDetection = new FaceDetection({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.5,
    });

    faceDetection.onResults((results: Results) => {
      setHasFace(results.detections.length > 0);
    });

    await faceDetection.initialize();

    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      faceDetection.send({ image: img });
    };
  }, []);

  const resetHasFace = useCallback(() => {
    setHasFace(null);
  }, []);

  return { hasFace, detectFace, resetHasFace };
};
