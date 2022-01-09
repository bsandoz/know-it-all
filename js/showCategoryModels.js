//Holt die Kategorie-ID aus der URL.
const params = new URLSearchParams(document.location.search);
const categoryid = params.get("categoryid");


var kategorieArray = [];
var mainContainer = document.getElementById("main-container");

fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/posts")
//https://174836_19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
	.then((response) => response.json())
	//.then(data => console.log(data))
	.then((data) => writePosts(data));

createNavigation();

//geht durch das Array von fetch und ruft die Funktionen PostsAnzeigen und customField für jeden Post auf.
function writePosts(arrayMitAllenPosts) {
	//console.log(arrayMitAllenPosts);
	var counter = 0;
	arrayMitAllenPosts.forEach((onePosts, i) => {
		console.log(counter);
		if (onePosts.categories == categoryid) {
			let title = document.getElementById("category-title");
			title.innerHTML = onePosts.acf.kategorie;
			let subtitle = document.getElementById("category-subtitle");
			subtitle.innerHTML = "Übersicht über die " + onePosts.acf.kategorie + "-Modelle";
			customField(onePosts.id);
			//setTimeout(() => { PostsAnzeigen(onePosts.title.rendered, onePosts.content.rendered, kategorieArray[i], onePosts.id, counter); }, 1000);
			PostsAnzeigen(onePosts.title.rendered, onePosts.content.rendered, kategorieArray[i], onePosts.id, counter);
			counter = updateCounter(counter);
			console.log(counter);
		}
	});
}

//Erstellt die Navigation, die es erlaubt, zwischen den Kategorien zu wechseln.
//ToDo: Namen der Kategorien abrufen und in den als Linktext anzeigen.
function createNavigation () {
	console.log("Called createNavigation");
	let prev = document.getElementById("previous-category");
	prev.addEventListener("click", function() {
		//Statischer Wert muss dynamisch gemacht werden, falls neue Kategorien dazukommen
		if (categoryid > 3) {
			parsed = parseInt(categoryid);
			parsed = parsed - 1;
			console.log(parsed);
			location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + parsed;
		}
	})
	let next = document.getElementById("next-category");
	next.addEventListener("click", function() {
		//Statischer Wert muss dynamisch gemacht werden, falls neue Kategorien dazukommen
		if (categoryid < 7) {
			parsed = parseInt(categoryid);
			parsed = parsed + 1;
			console.log(parsed);
			location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + parsed;
		}
	})
}

//erstellt ein card-Div mit Titel und Content und hängt die Elemente an den container an.
function PostsAnzeigen(title, content, category, id, counter) {
	console.log(counter);
	let container;
	//ToDo: Elegantere Lösung finden, die bei mehr Modellen auch funktioniert.
	if (counter <= 1) {
		container = document.getElementById("vertical-container-1");
	} else if (counter > 1 && counter <= 3) {
		container = document.getElementById("vertical-container-2");
	} else if (counter > 3 && counter <= 5) {
		container = document.getElementById("vertical-container-3");
	} else if (counter > 5 && counter <= 7) {
		container = document.getElementById("vertical-container-4");
	}	else {
		console.log("Not enough containers for amount of models.");
	}
	const card = document.createElement("article");
	card.setAttribute("class", "is-child box my-3 mx-3 py-6 px-3 has-text-centered");
	card.setAttribute("style", "background-color: #6AC6DC");
	const p = document.createElement("p");
	p.setAttribute("class", "is-size-5");
	p.setAttribute("style", "color: white");
	p.innerHTML = title;
	container.appendChild(card);
	card.appendChild(p);
	card.addEventListener("click", function() {
		localStorage.setItem("modelCategory", categoryid);
		location.href='https://174836-21.web1.fh-htwchur.ch/subsites/model.html?postid=' + id;
	})
	console.log(kategorieArray);
}

//holt die custom fields jedes Post anhand der id und ruft die Funktion writeCustomField auf.
function customField(id){
	console.log("https://174836-19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/"+id);
	var url = "https://174836-19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/"+id;
	fetch(url)
	//https://629120-4.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
		.then((response) => response.json())
		//.then(data => console.log(data))
		.then((data) => writeCustomField(data));

}

//Gibt das custom field in der Konsole aus
function writeCustomField(data){
	//console.log(data.acf.kategorie);
	kategorieArray.push(data.acf.kategorie);
	console.log(kategorieArray);
	const kategorie = document.createElement("p");
	kategorie.innerHTML = data.acf.kategorie;
	//container.appendChild(kategorie);
	//console.log(data.acf.kurzbeschreibung);
}

/* Funktion hat nicht wie gewünscht funktioniert, deswegen andere Lösung gefunden.
function createVerticalContainer() {
	const cont = document.createElement("div");
	cont.setAttribute("class", "is-parent is-vertical is-3");
	cont.setAttribute("class", "container");
	mainContainer.appendChild(cont);
}
*/

//Updatet den counter und gibt ihn zurück zur Nutzung in writePosts.
function updateCounter(count) {
	let counter = count;
	counter++;
	return counter;
}


/* Nicht mehr benötigt
function customFieldsAnzeigen(input) {
	console.log(input);
	kategorieField = document.createElement("p");
	kategorieField.innerHTML = input;
}
*/
