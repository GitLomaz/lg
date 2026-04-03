import React from 'react';
import GalleryRow from './GalleryRow';

interface GalleryRowsProps {
  tags: string[]
}

const GalleryRows: React.FC<GalleryRowsProps> = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <GalleryRow key={tag} genre={tag} />
      ))}
    </div>
  );
};

export default GalleryRows;