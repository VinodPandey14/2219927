import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "../../LoggingMiddleware/logger";

function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    let all = JSON.parse(localStorage.getItem("urlList")) || [];
    let found = all.find((x) => x.shortcode === shortcode);

    if (found) {
      let now = Date.now();
      let expire = new Date(found.expiry).getTime();

      if (now < expire) {
        found.clicks.push({
          time: new Date(now).toISOString(),
          source: document.referrer || "direct",
          location: "unknown",
        });

        localStorage.setItem("urlList", JSON.stringify(all));
        logEvent(
          "frontend",
          "info",
          "route",
          "Redirecting to " + found.longUrl
        );
        window.location.href = found.longUrl;
      } else {
        alert("This link has expired.");
      }
    } else {
      alert("Short URL not found.");
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
}

export default RedirectPage;
