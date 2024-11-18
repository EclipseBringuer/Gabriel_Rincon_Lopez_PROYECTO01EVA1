import { BuscaMinas } from "./BuscaMinas.js";

/**
 * Función que pide los datos de las dimensiones del tablero y las devuelve en formato objeto
 * @returns {Object} Las dimensiones del tablero
 */
function askDimensions() {
  let rows = 0;
  let columns = 0;

  do {
    rows = parseInt(prompt("Introduce el número de filas (10-20): ", 10));
    if (!BuscaMinas.validDimension(rows)) alert("Número de filas no válido");
  } while (!BuscaMinas.validDimension(rows));

  do {
    columns = parseInt(prompt("Introduce el número de columnas (10-20): ", 10));
    if (!BuscaMinas.validDimension(columns))
      alert("Número de columnas no válido");
  } while (!BuscaMinas.validDimension(columns));

  return { rows, columns };
}

/**
 * Función que pide el número de bombas al usuario en base a un juego pasado por parametro
 * @param {BuscaMinas} game - Juego buscaminas
 */
function askNumBombs(game) {
  let numBombs = 0;
  do {
    numBombs = parseInt(
      prompt(
        `Introduce el número de bombas(${game.getMinNumberBombs()}-${game.getMaxNumberBombs()}): `
      )
    );
    if (!game.validNumberOfBombs(numBombs)) alert("Número de bombas no válido");
  } while (!game.validNumberOfBombs(numBombs));
  game.setBombsNumber(numBombs);
}

/**
 * Función para empezar la música
 */
function startMusic() {
  const music = document.getElementById("background-music");
  if (music) {
    music.play();
  } else {
    console.warn("Elemento de música no encontrado.");
  }
}

/**
 * Función para pausar la música
 */
function stopMusic() {
  const music = document.getElementById("background-music");
  if (music) {
    music.pause();
  } else {
    console.warn("Elemento de música no encontrado.");
  }
}

/**
 * Revela el contenido de una celda y verifica las condiciones de victoria o derrota.
 * @param {number} row - Fila de la celda a revelar.
 * @param {number} column - Columna de la celda a revelar.
 *
 * No he podido arreglar el error, ya que el HTML no reconoce la función
 */
function revealCell(board, row, column) {
  const cell = board[row][column];
  const cellElement = document.querySelector(
    `td[data-row="${row}"][data-column="${column}"]`
  );

  if (!cellElement || !cellElement.classList.contains("covered")) {
    return; // Evita destapar celdas ya reveladas
  }

  if (cell.getHasBomb()) {
    cellElement.classList.remove("covered");
    cellElement.classList.add("bomb");
    cellElement.textContent = "💣";
    alert("Has perdido 😢");
    this.revealAllBombs();
    return;
  }

  cellElement.classList.remove("covered");
  cellElement.classList.add("revealed");
  cellElement.textContent = cell.getNearBombs() || "";

  if (BuscaMinas.checkVictory()) {
    alert("¡Victoria! 🎉");
  }
}

/**
 * Código principal del juego
 */
function playGame() {
  //Preguntamos por las dimensiones del tablero
  let { rows, columns } = askDimensions();

  //Creamos un BuscaMinas con esas dimensiones
  let game = new BuscaMinas(rows, columns);

  //Preguntamos por el número de bombas
  askNumBombs(game);

  //Generamos el tablero con los datos introducidos
  game.generateBoard();

  document.getElementById("solution").addEventListener("click", () => {
    document.getElementById("board").innerHTML = game.printSolutionBoard();
  });

  document.getElementById("reset").addEventListener("click", () => {
    game.generateBoard();
    game.printBoard();
  });

  //Imprime el tablero en la pantalla
  game.printBoard();

  //Si el usuario quiere música la iniciamos
  if (confirm("¿Quieres tener Música?")) {
    startMusic();
  }
}

//Llamamos al método principal para iniciar el juegos
playGame();
