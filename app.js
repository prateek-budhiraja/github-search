const input = document.getElementsByTagName("input")[0];
const errorBox = document.getElementById("error-box");

async function handleSearch(event) {
	event.preventDefault();
	const userName = input.value;
	input.value = "";
	const result = await fetch(`https://api.github.com/users/${userName}`);
	// if user does not exist then show error message and return
	if (result.status !== 200) {
		errorBox.innerHTML = "Username not found!!!";
		return;
	}
	// if user exists then show user info
	const userInfo = await result.json();
	showInfo(userInfo);
}

function showInfo(userInfo) {
	const {
		avatar_url,
		gravatar_url,
		name,
		bio,
		twitter_username,
		followers,
		following,
		repos_url,
		public_repos,
	} = userInfo;
	const infoBox = document.getElementById("info-box");

	// setting avatar
	const avatar = document.getElementById("avatar");
	avatar.src = avatar_url || gravatar_url;

	// setting name
	const nameTag = document.getElementById("name");
	nameTag.innerHTML = name || "No name";

	// setting bio
	const bioTag = document.getElementById("bio");
	bioTag.innerHTML = bio;

	// setting twitter username
	const twitterUsernameTag = document.getElementById("twitter");
	twitterUsernameTag.innerHTML = twitter_username || "No twitter username";

	// setting followers
	const followersTag = document.getElementById("followers");
	followersTag.innerHTML = followers;

	// setting following
	const followingTag = document.getElementById("following");
	followingTag.innerHTML = following;

	// setting public repos
	const publicReposTag = document.getElementById("repo");
	publicReposTag.innerHTML = public_repos;

	infoBox.classList.remove("hidden");

	// setting repos
	setRepos(repos_url);
}

async function setRepos(repoUrl) {
	const repos = await fetch(repoUrl);
	const reposData = await repos.json();

	if (reposData.length !== 0) {
		const repoContainer = document.getElementById("repo-list-container");
		repoContainer.classList.remove("hidden");
	}

	const reposList = document.getElementById("repos-list");
	reposData.forEach((repo) => {
		const { full_name, html_url, description } = repo;
		const repoItem = document.createElement("div");
		repoItem.classList =
			"mt-2 border-2 border-vilot-500 rounded-lg text-white p-3 md:px-5";
		repoItem.innerHTML = `<h3 class="text-violet-300 text-md md:text-lg"><a href="${html_url}">${full_name}</a></h3>
        <p class="text-xs md:text-base mt-1 md:mt-2">${
					description || "No description"
				}</p>`;
		reposList.appendChild(repoItem);
	});
}

// full_name => link to html_url
// description
