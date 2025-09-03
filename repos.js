async function loadRepos() {
  const username = "ewanp-dev";
  const list = document.getElementById("repo-list");
  list.innerHTML = "Loading repos...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { "Accept": "application/vnd.github.v3+json" }
    });

    if (!response.ok) throw new Error("GitHub API error");
    const repos = await response.json();

    list.innerHTML = "";

    for (const repo of repos) {
      const commitRes = await fetch(
        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
        { headers: { "Accept": "application/vnd.github.v3+json" } }
      );
      const commitData = await commitRes.json();
      const latestCommit = commitData[0]?.commit?.message || "No commits";
      const commitDate = commitData[0]?.commit?.committer?.date
        ? new Date(commitData[0].commit.committer.date).toLocaleDateString()
        : "Unknown";

      const card = document.createElement("div");
      card.className = "repo-card";
      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
        <p class="repo-desc">${repo.description || "No description provided"}</p>
        <div class="repo-meta">
          ${repo.language || "Unknown"} | 
          Last commit: "${latestCommit}" (${commitDate})
        </div>
      `;
      list.appendChild(card);
    }
  } catch (err) {
    list.innerHTML = "⚠️ Failed to load repositories.";
    console.error(err);
  }
}

window.onload = loadRepos;