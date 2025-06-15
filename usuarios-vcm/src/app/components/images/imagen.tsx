// components/images/Imagen.tsx
import React from 'react';

const Imagen = () => (
  <div className="text-center my-4">
    <img
      src="https://images.pexels.com/photos/2444852/pexels-photo-2444852.jpeg"
      alt="Volley court"
      className="img-fluid rounded"
    />
    <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
      📷 Photo by <a href="https://www.pexels.com/@mali" target="_blank" rel="noopener noreferrer">Mali Maeder</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>
    </p>
  </div>
);

export default Imagen;
