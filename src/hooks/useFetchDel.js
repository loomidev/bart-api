import { useState } from 'react';

const useFetchDel = () => {
  const [error, setError] = useState(null);

  const deleteData = async (deletePath) => {
    try {
      const response = await fetch(deletePath, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Vymazanie sa nepodarilo');
      }
      return true; // Vymazanie prebehlo úspešne 
    } catch (error) {
      setError(error);
      return false; // Vymazanie sa nepodarilo
    }
  };
  return { deleteData, error };
};

export default useFetchDel;