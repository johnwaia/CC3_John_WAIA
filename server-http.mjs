import http from "node:http";
const host = "localhost";
const port = 8000;
import fs from "node:fs/promises";

// function requestListener(_request, response) {
//   response.writeHead(200);
//   response.end("<html><h1>My first server!<h1></html>");
// }

// function requestListener(_request, response) {
//   response.setHeader("Content-Type", "application/json");
//   response.end(JSON.stringify({ message: "I'm OK" }));
// }

// async function requestListener(_request, response) {
//   try {
//     const contents = await fs.readFile("__index.html", "utf8");
//     response.setHeader("Content-Type", "text/html");
//     response.writeHead(200);
//     response.end(contents);
//   } catch (error) {
//     console.error(error);
//     response.writeHead(500, { "Content-Type": "text/plain" });
//     response.end("Erreur interne du serveur : Fichier introuvable.");
//   }
// }

// async function requestListener(request, response) {
//   response.setHeader("Content-Type", "text/html");
//   try {
//     const contents = await fs.readFile("index.html", "utf8");
//     switch (request.url) {
//       case "/index.html":
//         response.writeHead(200);
//         return response.end(contents);
//       case "/random.html":
//         response.writeHead(200);
//         return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
//       default:
//         response.writeHead(404);
//         return response.end(`<html><p>404: NOT OUND</p></html>`);
//     }
//   } catch (error) {
//     console.error(error);
//     response.writeHead(500);
//     return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
//   }
// }

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const urlParts = request.url.split("/"); // Divise l'URL en parties utilise comme séparateur "/"
    switch (urlParts[1]) { // Utilise la première partie de l'URL pour le switch
      case "index.html":
      case "":
        const contents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        return response.end(contents);
      case "random":
        if (urlParts[2]) {
          // Vérifie si le paramètre :nb est présent
          const nb = parseInt(urlParts[2], 10); // Convertit la partie du paramètre en entier
          if (!isNaN(nb)) {
            // Vérifie si la conversion est réussie
            const randomNumbers = generateRandomNumbers(nb);
            response.writeHead(200);
            return response.end(`<html><p>${randomNumbers.join(", ")}</p></html>`);
          }
        }
        // Si le paramètre :nb est manquant ou invalide, renvoyer une erreur 400 Bad Request
        response.writeHead(400);
        return response.end(`<html><p>400: BAD REQUEST</p></html>`);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(100 * Math.random()));
  }
  return randomNumbers;
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
