const username = "ewanp-dev";
const repoList = document.getElementById("repo-list");
const allowedRepos = ["usd-dependency-viewer", "website", "dotfiles"];

// fetch repos
fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((repo) => {
      if (allowedRepos.includes(repo.name) && repo.name !== "ewanp-dev") {
        // create a list item for each repo
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">
          <i class="fas fa-code-branch"></i> ${repo.name}
        </a>`;
        repoList.appendChild(listItem);
      }
    });
  })
  .catch((error) => console.error("Error fetching repositories:", error));