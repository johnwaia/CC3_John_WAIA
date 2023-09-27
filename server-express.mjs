import express from "express";
import morgan from "morgan";
import httpErrors from "http-errors";
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();

// Configuration pour utiliser EJS comme moteur de rendu
app.set("view engine", "ejs");

// Middleware Morgan en mode développement
if (app.get("env") === "development") {
  app.use(morgan("dev"));
}

// Middleware pour servir des fichiers statiques
app.use(express.static("static"));

// Route pour la page d'accueil
app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./static" });
});

// Route pour /random/:nb
app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);
  if (Number.isNaN(length)) {
    return next(httpErrors(400));
  }

  const numbers = Array.from({ length }, () => Math.floor(100 * Math.random()));
  const welcome = "Random Numbers:";
  response.render("random", { numbers, welcome });
});

// Middleware pour gérer les erreurs 404 et 500
app.use((request, response, next) => {
  logger.debug(`default route handler : ${request.url}`);
  return next(httpErrors(404));
});

app.use((error, _request, response, _next) => {
  logger.debug(`default error handler: ${error}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  )
);

logger.info(`File ${import.meta.url} executed.`);
