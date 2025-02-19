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
        <GalleryRow genre={tag} />
      ))}
    </div>
  );
};

export default GalleryRows;