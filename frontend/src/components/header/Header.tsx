
import { Link ,useLocation} from "react-router-dom";
import logo from "/site-logo.png";
import "./Header.scss";
import { ROUTES } from "../../router/route-constants";

const headerItems = [
  {
    label: "Generate Video",
    link: ROUTES.GENERATE_VID,
  },
  {
    label: "Login",
    link: ROUTES.HOME,
  },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="header-container">
      <nav className="inner-header-container">
        <img src={logo} className="app-logo" />
        <ul>
          {headerItems?.map((item) => {
            const selectedLink = item.link === location.pathname;
            return (
              <li className={`${selectedLink ? "selected-link" : ""}`}>
                <Link to={item.link}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
