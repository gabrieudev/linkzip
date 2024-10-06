const baseUrl = "https://linkzip-f511.onrender.com";

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;
  const custom = document.getElementById("custom").value;

  if (custom.trim() === "") {
    shorten(url);
  } else {
    shortenCustom(url, custom);
  }
});

function shorten(url) {
  const mainDiv = document.getElementById("main-section");
  const responseDiv = document.getElementById("response");
  const output = document.querySelector("section#response p");
  const copyDiv = document.getElementById("copy");

  output.innerText = "Shortening URL, wait a second...";
  mainDiv.style.borderRadius = "20px 20px 0px 0px";
  responseDiv.style.display = "block";

  axios
    .post(baseUrl + "/shorten", {
      fullUrl: url,
    })
    .then((response) => {
      if (response.status === 200) {
        output.innerText = response.data.shortenedUrl;
      } else {
        output.innerText = response.data.detail;
      }
      copyDiv.style.display = "block";
    })
    .catch((error) => {
      output.innerText = error;
    });
}

function shortenCustom(url, custom) {
  const mainDiv = document.getElementById("main-section");
  const responseDiv = document.getElementById("response");
  const output = document.querySelector("section#response p");
  const copyDiv = document.getElementById("copy");

  output.innerText = "Shortening URL, wait a second...";
  mainDiv.style.borderRadius = "20px 20px 0px 0px";
  responseDiv.style.display = "block";

  axios
    .post(baseUrl + "/shorten/custom", {
      fullUrl: url,
      token: custom,
    })
    .then((response) => {
      if (response.status === 200) {
        output.innerText = response.data.shortenedUrl;
      } else {
        output.innerText = response.data.detail;
      }
      copyDiv.style.display = "block";
    })
    .catch((error) => {
      output.innerText = error;
    });
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
