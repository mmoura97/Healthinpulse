function MobileMenuButton({ onClick }) {
    return (
        <button className="mobile-menu-btn" onClick={onClick}>
            <i className="fa-solid fa-bars"></i>
        </button>
    );
}

export default MobileMenuButton;