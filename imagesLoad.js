document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM loaded");

	const slugDivs = document.querySelectorAll(".slug");
	const slugArray = Array.from(slugDivs).map(div => div.textContent.trim());

	slugArray.forEach(slug => {
		console.log(slug);
		const apiUrl = ' https://imgload.vvvitasiempre.workers.dev/?slug='+slug;

		fetch(apiUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					const container = document.querySelector(`div[output="${slug}"][data="img"]`);

					data.forEach(item => {
						const img = document.createElement("img");
						img.src = item;
            img.className = 'case-list-item_gallery_item';
            console.log(img.classList);
						container.appendChild(img);
					});
				} else {
					console.error("Unexpected data format", data);
				}
			})
			.catch(error => console.error("Error fetching data:", error));
	});
  
  
});
