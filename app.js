const input = document.getElementsByTagName("input")[0];
const errorBox = document.getElementById("error-box");

async function handleSearch(event) {
	event.preventDefault();
	const userName = input.value;
	input.value = "";
	const result = await fetch(`https://api.github.com/users/${userName}`);
	if (result.status !== 200) {
		errorBox.innerHTML = "Username not found!!!";
	}
	const userInfo = await result.json();
}
