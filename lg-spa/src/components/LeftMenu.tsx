import React from 'react';

interface LeftMenuProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ tags, onTagClick }) => {
  return (
    <aside>
      <h3 className="text-2xl mb-2.5">Game Tags</h3>
      <ul className="list-none p-0">
        {tags.map((tag) => (
          <li 
            key={tag} 
            className="p-2.5 cursor-pointer transition-colors duration-300 hover:bg-[#34495e]" 
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftMenu;