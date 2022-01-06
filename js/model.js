//Holt post id aus der URL und speichert sie als Variable für die weitere Verwendung im Fetch.
const params = new URLSearchParams(document.location.search);
const postid = params.get("postid");

//Fetches holen Json Daten von Wordpress Posts und ACF Daten. Async um sicherzustellen, dass alle Infos geladen werden.
(async () => {
  await fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/posts/" + postid)
    .then ((response) => response.json())
    .then ((data) => writePost(data));

  await fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/" + postid)
    .then ((response) => response.json())
    .then ((data) => writeAcfPost(data));
})();

//Holt den Titel des Posts aus Json, Kategorie ist in der momentanen Umsetzung hier überflüssig.
function writePost(jsonData) {
  showModel(jsonData.title.rendered, jsonData.acf.kategorie);
}

//Holt alle weiteren Infos von den Custom Fields und ruft die Funktion showAcfModel auf.
function writeAcfPost(jsonData) {
    showAcfModel(jsonData.acf.kategorie, jsonData.acf.kurzbeschreibung, jsonData.acf.beitragsbild.url, jsonData.acf.autor, jsonData.acf.anwendung, jsonData.acf.erklaerung, jsonData.acf.schritt_fuer_schritt, jsonData.acf.beispiel_bild.url, jsonData.acf.beispiel_text, jsonData.acf.kritik, jsonData.acf.kombinierbarkeit);
  }

//Ruft den Titel aus dem HTML ab und ändert den textContent zum Titel aus Json.
function showModel(title, category) {
  const h1 = document.getElementById("title");
  h1.textContent = title;
  const siteTitle = document.getElementById("site-title");
  siteTitle.textContent = title + " | Know-It-All";
}

//Ruft alle anderen Felder aus dem HTML ab und ändert ihren Inhalt zu dem aus den ACF.
function showAcfModel(category, description, postImage, author, usage, explanation, stepbystep, exampleImage, exampleText, criticism, combinable) {
  const kategorieText = document.getElementById("category");
  kategorieText.textContent = "#" + category;
  kategorieText.addEventListener("click", function() {
    //Macht den Kategorie-Text zum Link, um zurück zur Kategorieübersicht zu kommen.
    //localStorage Lösung ist nicht optimal, falls der Local Storage aus irgendwelchem Grund geleert wird funktioniert der Link nicht mehr richtig
    let id = localStorage.getItem("modelCategory");
    location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + id;
	})
  const kurzbeschreibungText = document.getElementById("description");
  kurzbeschreibungText.innerHTML = description;
  const autorText = document.getElementById("author");
  autorText.innerHTML = author;
  const beitragsbildImage = document.getElementById("model-image");
  beitragsbildImage.src = postImage;
  const anwendungText = document.getElementById("usage");
  anwendungText.innerHTML = usage;
  const erklaerungText = document.getElementById("explanation");
  erklaerungText.innerHTML = explanation;
  const schrittfuerschrittText = document.createElement("p");
  schrittfuerschrittText.innerHTML = stepbystep;
  const beispielImage = document.getElementById("example-image");
  beispielImage.src = exampleImage;
  const beispielText = document.getElementById("example-text");
  beispielText.innerHTML = exampleText;
  const kritikText = document.getElementById("criticism");
  kritikText.innerHTML = criticism;
  const kombinierbarkeitText = document.createElement("p");
  kombinierbarkeitText.innerHTML = combinable;
  /*Alter Code
  container.appendChild(kategorieText);
  container.appendChild(autorText);
  container.appendChild(beitragsbildImage);
  container.appendChild(kurzbeschreibungText);
  container.appendChild(anwendungText);
  container.appendChild(erklaerungText);
  container.appendChild(schrittfuerschrittText);
  container.appendChild(schrittfuerschrittText);
  container.appendChild(beispielImage);
  container.appendChild(beispielText);
  container.appendChild(kritikText);
  container.appendChild(kombinierbarkeitText);
  */
}
