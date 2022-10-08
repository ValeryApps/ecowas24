import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CategoriesMenu } from "./CategoriesMenu";
import { categories } from "../../data/categories";
import { IntroHeader } from "./IntroHeader";
import { AppDrawer } from "./AppDrawer";
import { IoClose, IoReorderFourOutline } from "react-icons/io5";
import "./appBar.css";

export const AppHeader2 = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { pathname } = useLocation();
  const token = user?.token ? jwt_decode(user?.token) : "";
  const { isModerator } = token;
  const [showCategories, setShowCategories] = useState(false);
  return (
    <>
      <div className="top_header">
        <IntroHeader />
        {showCategories && (
          <CategoriesMenu
            categories={categories.slice(3)}
            navigate={navigate}
            visible={setShowCategories}
          />
        )}
      </div>
      <header
        class="navbar navbar-expand-md navbar-dark bd-navbar app_nav"
        style={{ backgroundColor: "#047260" }}
      >
        <nav
          class="container-xxl flex-wrap flex-md-nowrap"
          aria-label="Main navigation"
        >
          <div className="app_left">
            {visible ? (
              <IoClose
                size={30}
                onClick={() => setVisible(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <IoReorderFourOutline
                size={30}
                onClick={() => setVisible(true)}
                style={{ cursor: "pointer" }}
              />
            )}
            <h1>E24</h1>
          </div>
          <a class="navbar-brand p-0 me-2" href="/" aria-label="Bootstrap"></a>
          <img src="../../../180.png" alt="" style={{ width: "50px" }} />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div class="collapse navbar-collapse" id="bdNavbar">
            <ul class="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
              {categories.slice(0, 4).map((category) => (
                <Link
                  to={`${category.link}`}
                  className={`${
                    category.link === pathname ? "active nav_item" : "nav_item"
                  }`}
                >
                  {category.text}
                </Link>
              ))}
            </ul>

            <hr class="d-md-none text-white-50" />

            <ul class="navbar-nav flex-row flex-wrap ms-md-auto"></ul>
          </div>
        </nav>
        <AppDrawer visible={visible} />
      </header>
    </>
  );
};
