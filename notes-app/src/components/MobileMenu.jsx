import { FiMenu, FiX } from 'react-icons/fi';

function MobileMenu({ isOpen, onToggle }) {
  return (
    <button className="mobile-menu-btn" onClick={onToggle}>
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </button>
  );
}

export default MobileMenu;