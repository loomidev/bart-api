import { useState } from 'react';

const useFetchPostPhoto = () => {
  const [error, setError] = useState(null);

  const postPhoto = async (selected, urlApi) => {
    try {
      const formData = new FormData();
      formData.append('image', selected, selected.name);

      const response = await fetch(urlApi, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Nahranie fotografie sa nepodarilo');
      }
      return true; // Fotografia bola úspešne pridaná
    } catch (error) {
      setError(error);
      return false; // Nahranie fotografie sa nepodarilo
    }
  };
  return { postPhoto, error };
};

export default useFetchPostPhoto;
