import React from 'react';
import './GalleryRows.css';
import GalleryRow from './GalleryRow';

interface GalleryRowsProps {
  tags: string[]
}

const GalleryRows: React.FC<GalleryRowsProps> = ({ tags }) => {
  return (
    <div className='gallery-rows'>
      {tags.map((tag) => (
        <GalleryRow key={tag} genre={tag} />
      ))}
    </div>
  );
};

export default GalleryRows;