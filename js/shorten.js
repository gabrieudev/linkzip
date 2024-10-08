document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;
  const custom = document.getElementById("custom").value;

  shorten(url, custom);
});

async function shorten(url, custom) {
  let apiUrl = "https://linkzip-f511.onrender.com";

  const mainDiv = document.getElementById("main-section");
  const responseDiv = document.getElementById("response");
  const output = document.querySelector("section#response p");
  const copyDiv = document.getElementById("copy");

  output.innerText = "Shortening URL, wait a minute...";
  mainDiv.style.borderRadius = "20px 20px 0px 0px";
  responseDiv.style.display = "block";

  let body = {};

  if (custom.trim() === "") {
    apiUrl += "/shorten";
    body = {
      fullUrl: url,
    };
  } else {
    apiUrl += "/shorten/custom";
    body = {
      fullUrl: url,
      token: custom,
    };
  }

  try {
    const response = await axios.post(apiUrl, body);
    copyDiv.style.display = "block";
    output.innerText = response.data.shortenedUrl;
  } catch (error) {
    output.innerText =
      error.response?.data?.detail || "Error while shortening url";
  }
}

function copyText() {
  const copyDiv = document.getElementById("copy");

  copyDiv.addEventListener("click", () => {
    const textToCopy = document.querySelector(
      "main section#response p"
    ).innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
      copyDiv.innerText = "URL copied!";

      setTimeout(() => {
        copyDiv.innerText = "Copy URL";
      }, 2000);
    });
  });
}
