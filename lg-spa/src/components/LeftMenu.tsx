import React from 'react';
import './LeftMenu.css';

interface LeftMenuProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ tags, onTagClick }) => {
  return (
    <aside className="left-menu">
      <h3 className="menu-title">Game Tags</h3>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag} className="tag-item" onClick={() => onTagClick(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftMenu;