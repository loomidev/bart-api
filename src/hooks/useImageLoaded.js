import { useState, useEffect } from "react";

const useImageLoaded = (urls) => {
  const [loadedImages, setLoadedImages] = useState({});
  
  useEffect(() => {
    const loadImages = () => {
      const loaded = {};
      const imageRefs = {}; // Vytvorenie lokalnej premennej pre ref

      urls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loaded[url] = true;
          setLoadedImages({ ...loaded });
        };
        img.onerror = () => {
          loaded[url] = false;
          setLoadedImages({ ...loaded });
        };
        imageRefs[url] = img; // Uloženie fotografie do lokálnej premennej ref
      });

      return imageRefs; // CleanUp function pre lokalnu premennu 
    };

    const imageRefs = loadImages(); // Zavolanie loadImages a uloženie do výsledku imageRefs

    return () => {
      Object.values(imageRefs).forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [urls]);

  return loadedImages;
};

export default useImageLoaded;
