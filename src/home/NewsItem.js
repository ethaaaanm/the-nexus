import React from "react";
import "./home.css";

const NewsItem = ({ title, date, content, isLastItem }) => {
    return (
      <div className="news-item">
        <h3>{title}</h3>
        {date && <p className="news-date">{date}</p>}
        <p>
          {isLastItem && content.includes("The Nexus") ? (
            <>
              {content.split("The Nexus!").map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <strong>The Nexus!</strong>}
                </React.Fragment>
              ))}
            </>
          ) : content.includes("@TheNexus-League") ? (
            <>
              {content.split("@TheNexus-League")[0]}
              <a
                href="https://www.youtube.com/@TheNexus-League"
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                @TheNexus-League
              </a>
            </>
          ) : (
            content
          )}
        </p>
      </div>
    );
  };
  
  export default NewsItem;