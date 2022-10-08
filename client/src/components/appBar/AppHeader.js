import { Link, useLocation, useNavigate } from "react-router-dom";
import { IntroHeader } from "./IntroHeader";
import "./appBar.css";
import { AppDrawer } from "./AppDrawer";
import { useState } from "react";
import {
  IoReorderFourOutline,
  IoClose,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import { UserMenu } from "./UserMenu";
import jwt_decode from "jwt-decode";
import { CategoriesMenu } from "./CategoriesMenu";
import { categories } from "../../data/categories";
import { IoCaretDown } from "react-icons/io5";
import { RightMenu } from "./RightMenu";

const navItems = [{ name: "Home", path: "/" }];

export const AppHeader = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
      <div className="top">
        <div className="app_nav">
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
            <h1
              onClick={() => navigate("/")}
              style={{ fontWeight: "700", cursor: "pointer" }}
            >
              <div className="E24_icon">
                <img src="../../../180.png" alt="" />
              </div>
            </h1>
          </div>
          <div className="rubrics">
            <div>
              {navItems.map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className={`${
                    path === pathname ? "active nav_item" : "nav_item"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>
            <div>
              {categories.slice(0, 3).map(({ text, link }) => (
                <Link
                  key={text}
                  to={`/category/${link}`}
                  className={`${
                    pathname === `/category/${link}`
                      ? "active nav_item"
                      : "nav_item"
                  }`}
                >
                  {text}
                </Link>
              ))}
            </div>
            <Link to="#" onClick={() => setShowCategories((prev) => !prev)}>
              <div className="news_menu">
                More News
                <IoCaretDown />
              </div>
            </Link>
          </div>
          <div>
            <div className="app_right_items">
              {!user ? (
                <Link
                  className={`${
                    pathname === "/login" ? "active nav_item" : "nav_item"
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              ) : (
                <div
                  className="user_nav_item"
                  onClick={() => setShowUserMenu((prev) => !prev)}
                >
                  <img src={user.picture} alt="" />{" "}
                  <span style={{ color: "white" }}>
                    {user?.first_name}
                    {showUserMenu && <UserMenu isAdmin={isModerator} />}
                  </span>
                </div>
              )}
              <div className="app_right">
                {isVisible ? (
                  <IoClose
                    size={30}
                    onClick={() => setIsVisible(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <IoEllipsisHorizontal
                    size={30}
                    onClick={() => setIsVisible(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <AppDrawer navItems={navItems} visible={visible} />
        <div className="menu_right">
          <RightMenu isVisible={isVisible} setIsVisible={setIsVisible} />
        </div>
      </div>
    </>
  );
};
