const params = new URLSearchParams(document.location.search);
const postid = params.get("postid");

(async () => {
  await fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/wp/v2/posts/" + postid)
    .then ((response) => response.json())
    .then ((data) => writePost(data));

  await fetch("https://174836-19.web1.fh-htwchur.ch/wp-json/acf/v3/posts/" + postid)
    .then ((response) => response.json())
    .then ((data) => writeAcfPost(data));
})();

function writePost(jsonData) {
  showModel(jsonData.title.rendered, jsonData.acf.kategorie);
}

function writeAcfPost(jsonData) {
    showAcfModel(jsonData.acf.kategorie, jsonData.acf.kurzbeschreibung, jsonData.acf.beitragsbild.url, jsonData.acf.autor, jsonData.acf.anwendung, jsonData.acf.erklaerung, jsonData.acf.schritt_fuer_schritt, jsonData.acf.beispiel_bild.url, jsonData.acf.beispiel_text, jsonData.acf.kritik, jsonData.acf.kombinierbarkeit);
  }

function showModel(title, category) {
  const h1 = document.createElement("h1");
  h1.textContent = title;
  container.appendChild(h1);
}

function showAcfModel(category, description, postImage, author, usage, explanation, stepbystep, exampleImage, exampleText, criticism, combinable) {
  const kategorieText = document.createElement("h2");
  kategorieText.textContent = category;
  kategorieText.addEventListener("click", function() {
    //localStorage Lösung ist nicht optimal, falls der Local Storage aus irgendwelchem Grund geleert wird funktioniert der Link nicht mehr richtig
    let id = localStorage.getItem("modelCategory");
    location.href='https://174836-21.web1.fh-htwchur.ch/subsites/category.html?categoryid=' + id;
	})
  const kurzbeschreibungText = document.createElement("p");
  kurzbeschreibungText.innerHTML = description;
  const autorText = document.createElement("p");
  autorText.innerHTML = author;
  const beitragsbildImage = document.createElement("img");
  beitragsbildImage.src = postImage;
  const anwendungText = document.createElement("p");
  anwendungText.innerHTML = usage;
  const erklaerungText = document.createElement("p");
  erklaerungText.innerHTML = explanation;
  const schrittfuerschrittText = document.createElement("p");
  schrittfuerschrittText.innerHTML = stepbystep;
  const beispielImage = document.createElement("img");
  beispielImage.src = exampleImage;
  const beispielText = document.createElement("p");
  beispielText.innerHTML = exampleText;
  const kritikText = document.createElement("p");
  kritikText.innerHTML = criticism;
  const kombinierbarkeitText = document.createElement("p");
  kombinierbarkeitText.innerHTML = combinable;
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
}
