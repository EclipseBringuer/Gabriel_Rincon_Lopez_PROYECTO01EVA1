import { BuscaMinas } from "./BuscaMinas.js";

function getDimensions() {
  rows = 0;
  columns = 0;

  return { rows, columns };
}

let game = new BuscaMinas(9, 9);

game.setBombsNumber(16);
game.generateBoard();
let tablero = game.printBoard();

document.getElementById("board").innerHTML = tablero;
