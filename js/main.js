fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/categories")
//https://174836_19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
	.then((response) => response.json())
	//.then(data => console.log(data))
	.then((data) => writeCategories(data));

function writeCategories (arrayMitAllenCategories) {
  arrayMitAllenCategories.forEach((oneCategories, i) => {
    console.log(oneCategories.id);
    categoriesAnzeigen(oneCategories.name, oneCategories.id);
	});
}


function categoriesAnzeigen(title, id) {
  const card = document.createElement("div");
	card.setAttribute("class", "card");
	const h1 = document.createElement("h1");
	h1.textContent = title;
  container.appendChild(card);
	card.appendChild(h1);
  card.addEventListener("click", function() {
		location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + id;
	})
}
