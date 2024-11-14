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

function askNumBombs(game) {
  let numBombs = 0;
  do {
    numBombs = parseInt(prompt("Introduce el número de bombas: "));
    if (!game.validNumberOfBombs(numBombs)) alert("Número de bombas no válido");
  } while (!game.validNumberOfBombs(numBombs));
  game.setBombsNumber(numBombs);
}

/**
 *
 */
function playGame() {
  let { rows, columns } = askDimensions();
  let game = new BuscaMinas(rows, columns);
  askNumBombs(game);
  game.generateBoard();
  document.getElementById("board").innerHTML = game.printBoard();
}

playGame();
