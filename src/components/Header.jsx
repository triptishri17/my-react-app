import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

function Header() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="header">
      <h3>Admin Panel</h3>

      <button onClick={() => setDark(!dark)}>
        {dark ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}

export default Header;
