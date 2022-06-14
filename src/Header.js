import React, { useState } from "react";

function Header() {

  return (
    <header className="uk-position-fixed uk-width-1-1@s " id="top-head">
      {/* {isLoading ? <Spinner /> : ""} */}
      <div className="uk-container uk-container-expand uk-background-primary">
        <nav
          className="uk-navbar uk-light"
          data-uk-navbar="mode:click; duration: 250"
        >
          <div>
            <a href="/">
              <img
                className="custom-logo"
                src="/images/logo.PNG"
                width="100"
                height="100"
                alt=""
              />
            </a>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a
                  className="uk-text-white"
                  href="/accounts/login"
                  title="Terminar a sessão"
                  data-uk-tooltip=""
                ></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
