# CC3_John_WAIA

**Question 1.1** donner la liste des en-têtes de la réponse HTTP du serveur.

- Status-Line (ex: "HTTP/1.1 200 OK") 
- Content-Type (ex: "Content-Type: text/html") 
- Content-Length (ex: "Content-Length: 42") 
- Date (ex: "Date: Mon, 27 Sep 2023 00:00:00 GMT") 
- Connection (ex: "Connection: keep-alive") 

### Servir différents types de contenus

**Question 1.2** donner la liste des en-têtes qui ont changé depuis la version précédente.

Les en-têtes qui ont changé sont Content-Type qui est passé à "application/json". 

**Question 1.3** que contient la réponse reçue par le client ?

Suite à la création du fichier index.html 
Donc la réponse client est la page index.html

**Question 1.4** quelle est l'erreur affichée dans la console ? Retrouver sur <https://nodejs.org/api> le code d'erreur affiché.

**Question 1.5** donner le code de `requestListener()` modifié _avec gestion d'erreur_ en `async/await`.

```js
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("Erreur interne du serveur : Fichier introuvable.");
  }
}
```

### Mode développement

**Question 1.6** indiquer ce que cette commande a modifié dans votre projet.

### Gestion manuelle des routes

**Question 1.7** quelles sont les différences entre les scripts `http-dev` et `http-prod` ?

Les différences entre les scripts http-dev et http-prod sont : 

http-dev utilise cross-env pour définir NODE_ENV sur "development". 
http-prod définit NODE_ENV sur "production" sans utiliser cross-env. 

**Question 1.8** donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

Les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes sont : 

- /index.html : 200 OK 
- /random.html : 200 OK 
- / : 200 OK 
- /dont-exist : 404 NOT FOUND 

```js
async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    switch (request.url) {
      case "/index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT OUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}
```

## Partie 2 : framework Express

**Question 2.1** donner les URL des documentations de chacun des modules installés par la commande précédente. 

Les URL des documentations des modules installés sont : 

- Express : https://expressjs.com/ 
- http-errors : https://github.com/jshttp/http-errors 
- loglevel : https://github.com/pimterry/loglevel 
- morgan : https://github.com/expressjs/morgan 

- http://localhost:8000/ 
- http://localhost:8000/index.html 
- http://localhost:8000/random/5 (En remplaçant 5 par le nombre d'entiers souhaités) 

**Question 2.2**: vérifier que les trois routes fonctionnent. 

Les trois routes fonctionnent. 
 
**Question 2.3** lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ? 

Les en-têtes des réponses fournies par Express incluent des en-têtes supplémentaires tels que X-Powered-By, Date, Content-Type, Content-Length, etc. 



**Question 2.4** quand l’événement listening est-il déclenché ? 

L'événement listening est déclenché lorsque le serveur commence à écouter les connexions. 

**Question 2.6** visiter la page d'accueil puis rafraichir (Ctrl+R) et _ensuite_ **forcer** le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier `style.css` ? Justifier.

Lorsque vous visitez la page d'accueil et que vous rafraîchissez (Ctrl+R), le code HTTP pour le fichier style.css est généralement 304 Not Modified, car le navigateur utilise sa copie en cache.

### Rendu avec EJS


### Gestion d'erreurs
**Question 2.7** vérifier que l'affichage change bien entre le mode _production_ et le mode _development_.

 L'affichage change entre le mode production et le mode développement en fonction du paramètre app.get("env"). En mode développement, les détails de l'erreur sont affichés, tandis qu'en mode production, seuls le code d'erreur et le message sont affichés.

 
