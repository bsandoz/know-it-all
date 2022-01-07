var container = document.getElementById("categories-container");

var columns = document.getElementById("columns");

let bgColorsArray = ["#6AC6DC", "#f39211", "#B7CD10", "#DA3C8E"];

fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/categories")
//https://174836_19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
	.then((response) => response.json())
	//.then(data => console.log(data))
	.then((data) => writeCategories(data));

var categoriesNames = [];

//Funktion categoriesAnzeigen wird für jedes Element des fetch arrays ausgeführt
function writeCategories (arrayMitAllenCategories) {
	let counter = 0;
	arrayMitAllenCategories.forEach((oneCategories, i) => {
		console.log(oneCategories.id);
    categoriesAnzeigen(oneCategories.name, oneCategories.id, counter);
		counter++;
		if (counter >= bgColorsArray.length) {
			counter = 0;
			bgColorsArray.reverse();
			container = document.createElement("div");
			container.setAttribute("class", "column is-half");
			container.setAttribute("id", "categories-container-2");
			columns.appendChild(container);
		}
		categoriesNames.push(oneCategories.name);
		console.log(categoriesNames);
	});
}

//Erstellt anhand des Titels der Kategorie einen klickbaren Kategorie-Button und gibt die id in der URL mit.
function categoriesAnzeigen(title, id, counter) {
	const card = document.createElement("div");
	card.setAttribute("class", "box my-4");
	card.setAttribute("style", "background-color: " + bgColorsArray[counter] + "; color: white");
	const text = document.createElement("p");
	text.setAttribute("class", "is-size-3 is-white py-4 px-4");
	text.textContent = "#" + title;
  container.appendChild(card);
	card.appendChild(text);
  card.addEventListener("click", function() {
		location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + id;
	})
}
