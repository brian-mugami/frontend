import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/my-data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    // Render your component using the retrieved data
  );
}
