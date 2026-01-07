"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState<Record<number, boolean>>({});
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  const toggleDropdown = (id: number) => {
    setDropdownToggler((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeMobileMenu = () => {
    setNavigationOpen(false);
    setDropdownToggler({});
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${
        stickyMenu
          ? "bg-white py-4! shadow-sm transition duration-100 dark:bg-black"
          : ""
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-auto xl:flex-shrink-0 xl:mr-8">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo/BaramedLogo.png"
              alt="Baramed Logo"
              width={140}
              height={45}
              className="h-auto w-auto max-w-[140px] object-contain"
              priority
            />
          </Link>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-0 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "w-full! delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 w-full!" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "w-full! delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "h-0! delay-0" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "h-0! delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:flex-1 xl:min-w-0 ${
            navigationOpen &&
            "navbar visible! mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav className="flex-1 xl:min-w-0 xl:overflow-hidden">
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-3 xl:flex-nowrap">
              {menuData.map((menuItem, key) => (
                <li key={key} className={`${menuItem.submenu ? "group relative" : ""} flex-shrink-0`}>
                  {menuItem.submenu ? (
                    <>
                      {/* Mobile: Clickable button with dropdown toggle */}
                      <div className="xl:hidden flex w-full items-center justify-between">
                        <Link 
                          href={menuItem.path || "#"}
                          onClick={closeMobileMenu}
                          className="flex-1 text-sm font-medium text-black transition-colors hover:text-primary dark:text-white"
                        >
                          {menuItem.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleDropdown(menuItem.id)}
                          className="flex-shrink-0 p-1"
                          aria-label="Toggle dropdown"
                        >
                          <svg
                            className={`h-4 w-4 fill-waterloo transition-transform ${dropdownToggler[menuItem.id] ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </button>
                      </div>

                      {/* Desktop: Hoverable link */}
                      <Link
                        href={menuItem.path || "#"}
                        className="hidden xl:flex group/link cursor-pointer items-center gap-1.5 whitespace-nowrap text-sm font-medium text-black transition-colors hover:text-primary dark:text-white xl:text-regular"
                      >
                        {menuItem.title}
                        <span className="flex-shrink-0">
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo transition-colors group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </Link>

                      {/* Dropdown Menu */}
                      <ul
                        className={`${
                          dropdownToggler[menuItem.id] ? "block" : "hidden"
                        } dropdown xl:w-auto xl:min-w-[700px] xl:max-w-[900px] xl:grid xl:grid-cols-3 xl:gap-8 xl:px-10 xl:py-8`}
                      >
                        {menuItem.submenu.map((item, subKey) => (
                          <li key={subKey} className="mb-4 last:mb-0 xl:mb-4">
                            {item.submenu ? (
                              <div>
                                <Link
                                  href={item.path || "#"}
                                  onClick={closeMobileMenu}
                                  className="mb-3 block text-sm font-bold text-black transition-colors hover:text-primary dark:text-white"
                                >
                                  {item.title}
                                </Link>
                                <ul className="space-y-2 pl-0 xl:pl-0">
                                  {item.submenu.map((subItem, subSubKey) => (
                                    <li key={subSubKey}>
                                      <Link
                                        href={subItem.path || "#"}
                                        onClick={closeMobileMenu}
                                        className="block py-1 text-sm text-waterloo transition-colors hover:text-primary dark:text-manatee"
                                      >
                                        {subItem.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <Link 
                                href={item.path || "#"}
                                onClick={closeMobileMenu}
                                className="block py-1 text-sm font-semibold text-black transition-colors hover:text-primary dark:text-white"
                              >
                                {item.title}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      onClick={closeMobileMenu}
                      className={`whitespace-nowrap text-sm font-medium transition-colors xl:text-regular ${
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "text-black hover:text-primary dark:text-white"
                      }`}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-3 xl:mt-0 xl:flex-shrink-0 xl:ml-6">
            <ThemeToggler />

            <Link
              href="/contact"
              className="flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-primaryho xl:px-6 xl:py-2.5 xl:text-regular"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
