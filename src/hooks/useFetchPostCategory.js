import { useState } from 'react';

const useFetchPostCategory = () => {
  const [error, setError] = useState(false);

  const postCategory = async (categoryTitle, url) => {
    let uploaded = {
      name: categoryTitle,
    };

    if (categoryTitle) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploaded),
        });

        if (response.ok) {
          return true;
        } else {
          if (response.status === 409) {
            setError('Kategória už existuje - zadaj iný názov');
          } else {
            setError('Nastala chyba pri vytváraní kategórie');
          }
          return false;
        }
      } catch (error) {
        setError('Kategória nebola pridaná');
        return false;
      }
    }
  };
  return { error, postCategory };
};

export default useFetchPostCategory;