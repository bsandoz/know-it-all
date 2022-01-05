const params = new URLSearchParams(document.location.search);
const categoryid = params.get("categoryid");

var kategorieArray = [];
// var postNumber;

fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/posts")
//https://174836_19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/
	.then((response) => response.json())
	//.then(data => console.log(data))
	.then((data) => writePosts(data));

createNavigation();

//geht durch das Array von fetch und ruft die Funktionen PostsAnzeigen und customField für jeden Post auf.
function writePosts(arrayMitAllenPosts) {
	//console.log(arrayMitAllenPosts);
	arrayMitAllenPosts.forEach((onePosts, i) => {
		if (onePosts.categories == categoryid) {
			let title = document.getElementById("categoryTitle");
			title.innerHTML = onePosts.acf.kategorie;
			let subtitle = document.getElementById("categorySubtitle");
			subtitle.innerHTML = "Übersicht der " + onePosts.acf.kategorie + "-Modelle";
			customField(onePosts.id);
			//customFieldsAnzeigen(kategorieData);
			setTimeout(() => { PostsAnzeigen(onePosts.title.rendered, onePosts.content.rendered, kategorieArray[i], onePosts.id); }, 2000);
		}
	});
}

function createNavigation () {
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
function PostsAnzeigen(title, content, category, id) {
	const card = document.createElement("div");
	card.setAttribute("class", "card");
	const h1 = document.createElement("h1");
	h1.textContent = title;
	const p = document.createElement("p");
	p.innerHTML = content;
	const kategorie = document.createElement("p");
	kategorie.innerHTML = category;
	container.appendChild(card);
	card.appendChild(h1);
	card.appendChild(kategorie);
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

/*
function customFieldsAnzeigen(input) {
	console.log(input);
	kategorieField = document.createElement("p");
	kategorieField.innerHTML = input;
}
*/
