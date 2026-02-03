import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h2 className="logo">Zuhaib</h2>
      <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
