var kategorieArray = [];
// var postNumber;

fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/posts")
//https://174836_19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
	.then((response) => response.json())
	//.then(data => console.log(data))
	.then((data) => writePosts(data));

//geht durch das Array von fetch und ruft die Funktionen PostsAnzeigen und customField für jeden Post auf.
function writePosts(arrayMitAllenPosts) {
	//console.log(arrayMitAllenPosts);
	arrayMitAllenPosts.forEach((onePosts, i) => {
		customField(onePosts.id);
		//customFieldsAnzeigen(kategorieData);
		PostsAnzeigen(onePosts.title.rendered, onePosts.content.rendered, kategorieArray[i]);
	});

	}

//erstellt ein card-Div mit Titel und Content und hängt die Elemente an den container an.
function PostsAnzeigen(title, content, category) {
	const card = document.createElement("div");
	card.setAttribute("class", "card");
	const h1 = document.createElement("h1");
	h1.textContent = title;
	const p = document.createElement("p");
	p.innerHTML = content;
	const kategorie = document.createElement("p");
	kategorie.innerHTML = kategorieArray[2];
	container.appendChild(card);
	card.appendChild(h1);
	card.appendChild(kategorie);
	card.appendChild(p);
	card.addEventListener("click", function() {
		location.href='https://174836-21.web1.fh-htwchur.ch/php/model.html';
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
	console.log(data.acf.kategorie);
	kategorieArray.push(data.acf.kategorie);
	const kategorie = document.createElement("p");
	kategorie.innerHTML = data.acf.kategorie;
	container.appendChild(kategorie);
	//console.log(data.acf.kurzbeschreibung);
}

/*
function customFieldsAnzeigen(input) {
	console.log(input);
	kategorieField = document.createElement("p");
	kategorieField.innerHTML = input;
}
*/
