document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;

  getClickCount(url);
});

async function getClickCount(url) {
  apiUrl = url + "/count";

  const mainDiv = document.getElementById("main-section");
  const responseDiv = document.getElementById("response");
  const output = document.querySelector("section#response p");

  output.innerText = "Getting URL click count, wait a minute...";
  mainDiv.style.borderRadius = "20px 20px 0px 0px";
  responseDiv.style.display = "block";

  try {
    const response = await axios.get(apiUrl);
    output.innerText = "Click count: " + response.data.count;
  } catch (error) {
    output.innerText =
      error.response?.data?.detail || "Error while getting URL click count";
  }
}
