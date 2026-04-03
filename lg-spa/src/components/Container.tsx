import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const NarrowContainer: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const WideContainer: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full px-4 ${className}`}>
      {children}
    </div>
  );
};
