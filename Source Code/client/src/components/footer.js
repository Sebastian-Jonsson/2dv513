import React from "react";
import twitterIcon from "../icons/twitter 1.svg";
import instagramIcon from "../icons/instagram 1.svg";
import youtubeIcon from "../icons/youtube-symbol 1.svg";

function Footer() {
  return (
    <footer>
      <h4>
        Part of the course 2dv513 - Adrian Rosales(ar223ng), Sebastian
        Jonsson(sj223gb) &copy; 2020
      </h4>
      <ul>
        <li>
          <a href="#">
            <img src={twitterIcon} alt="twitter social" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={instagramIcon} alt="ig social" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src={youtubeIcon} alt="youtube-symbol social" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
