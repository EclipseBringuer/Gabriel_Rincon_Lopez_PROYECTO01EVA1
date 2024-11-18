import { Cell } from "./Cell.js";

/**
 * Clase que representa el juego del Buscaminas
 */
export class BuscaMinas {
  /**
   * Crea un nuevo juego de Buscaminas
   * @param {number} columns - Representa el número de columnas
   * @param {number} rows - Representa el número de filas
   */
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.bombsNumber = 0;
    this.board = [];
  }

  /**
   * Cambia el número de columnas
   * @param {number} columns - La nueva cantidad de columnas
   */
  setColumns(columns) {
    this.columns = columns;
  }

  /**
   * Cambia el número de filas
   * @param {number} rows  - La nueva cantidad de filas
   */
  setRows(rows) {
    this.rows = rows;
  }

  /**
   * Cambia el número de bombas
   * @param {number} bombsNumber  - La nueva cantidad de bombas
   */
  setBombsNumber(bombsNumber) {
    this.bombsNumber = bombsNumber;
  }

  /**
   * Devuelve el número de columnas
   * @returns {number} El número de columnas
   */
  getColumns() {
    return this.columns;
  }

  /**
   * Devuelve el número de filas
   * @returns {number} El número de filas
   */
  getRows() {
    return this.rows;
  }

  /**
   * Devuelve el número de bombas
   * @returns {number} El número de bombas
   */
  getBombsNumber() {
    return this.bombsNumber;
  }

  /**
   * Devuelve el array de celdas del tablero
   * @returns {Cell[]} El tablero de celdas
   */
  getBoard() {
    return this.board;
  }

  /**
   * Comprueba que una dimensión (fila o columna) cumple con lo indicado (menor o igual que 20 y
   * mayor o igual que 10)
   * @returns {boolean} Si las dimensión cumple con los requisitos
   */
  static validDimension(dimension) {
    return dimension <= 20 && dimension >= 10;
  }

  /**
   * Comprueba que el número de bombas sea adecuado al las dimensiones del buscaminas
   * @returns {boolean} Si el número de bombas cumple con las dimensiones
   */
  validNumberOfBombs(numberBombs) {
    return (
      Math.trunc((this.columns * this.rows) / 6) <= numberBombs &&
      Math.trunc((this.columns * this.rows) / 2) >= numberBombs
    );
  }

  /**
   * Devuelve el mínimo de bombas que debe tener el tablero
   * @returns {number} Mínimo de bombas del tablero
   */
  getMinNumberBombs() {
    return Math.trunc((this.columns * this.rows) / 6);
  }

  /**
   * Devuelve el máximo de bombas que debe tener el tablero
   * @returns {number} Máximo de bombas del tablero
   */
  getMaxNumberBombs() {
    return Math.trunc((this.columns * this.rows) / 2);
  }

  /**
   * Método que se encarga de crear un tablero vacío con las dimensiones del objeto
   */
  createEmptyBoard() {
    for (let r = 0; r < this.rows; r++) {
      this.board[r] = [];
      for (let c = 0; c < this.columns; c++) {
        this.board[r][c] = new Cell(r, c, false);
      }
    }
  }

  /**
   * Método que coloca las bombas de forma aleatoria en el tablero
   */
  placeBombs() {
    //Creamos un contador con la cantidad de bombas
    let counter = this.bombsNumber;

    //Mientras haya bombas por colocar, iteramos
    do {
      let row = parseInt(Math.random() * this.rows);
      let column = parseInt(Math.random() * this.columns);

      /**
       * En caso de que la celda escogida al azar no tenga bomba,
       * la colocamos y decrementamos el contador
       */
      if (!this.board[row][column].getHasBomb()) {
        this.board[row][column].setHasBomb(true);
        counter--;
      }
    } while (counter > 0);
  }

  /**
   * Método que calcula el número de bombas cercanas de cada celda
   */
  calculateNearBombs() {
    const directions = [
      [1, -1], //Diagonal superior izquierda
      [1, 0], //Central superior
      [1, 1], //Diagonal superior derecha
      [0, -1], //Central izquierda
      [0, 1], //Central derecha
      [-1, -1], //Diagonal inferior izquierda
      [-1, 0], //Central inferior
      [-1, 1], //Diagonal inferior derecha
    ];

    //Recorremos el tablero
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        //Por cada celda establecemos un contador de bombas cercanas
        let nearBombs = 0;

        //Comprobamos todas las direcciones con un bucle
        for (let [x, y] of directions) {
          let nearRow = r + x;
          let nearColumn = c + y;

          /**
           * Si la posición de la celda que estamos comprobando esta dentro del rango
           * del tablero, y si esta celda tiene una bomba, incrementamos el contador.
           */
          if (
            nearRow >= 0 &&
            nearRow < this.rows &&
            nearColumn >= 0 &&
            nearColumn < this.columns
          ) {
            if (this.board[nearRow][nearColumn].getHasBomb()) {
              nearBombs++;
            }
          }
        }
        //Por último añadimos el contador a la celda
        this.board[r][c].setNearBombs(nearBombs);
      }
    }
  }

  /**
   * Método que genera el tablero del buscaminas
   */
  generateBoard() {
    //Crea un tablero con celdas según las dimensiones
    this.createEmptyBoard();

    //Coloca las bombas de forma aleatoria
    this.placeBombs();

    //Calcula el número de bombas cercanas de cada celda
    this.calculateNearBombs();
  }

  /**
   * Devuelve el tablero solucionado en formato HTML
   * @returns {string} El tablero en formato HTML
   */
  printSolutionBoard() {
    let board = "";

    for (let r = 0; r < this.rows; r++) {
      board += "<tr>";
      for (let c = 0; c < this.columns; c++) {
        board += `<td>${
          this.board[r][c].getHasBomb()
            ? "Mina"
            : this.board[r][c].getNearBombs()
        }</td>`;
      }
      board += "</tr>";
    }

    return board;
  }

  /**
   * Muestra un tablero interactivo donde las celdas están tapadas inicialmente.
   * Al hacer clic en una celda, se destapa y muestra lo que contiene (bomba o contador).
   * También verifica condiciones de victoria y derrota.
   */
  printBoard() {
    const boardElement = document.getElementById("board");

    let boardHTML = "";

    for (let r = 0; r < this.rows; r++) {
      boardHTML += "<tr>";
      for (let c = 0; c < this.columns; c++) {
        boardHTML += `<td 
        data-row="${r}" 
        data-column="${c}" 
        class="cell covered" 
        onclick="revealCell(game.getBoard(), ${r}, ${c})">
      </td>`;
      }
      boardHTML += "</tr>";
    }

    boardElement.innerHTML = boardHTML;
  }

  /**
   * Revela todas las bombas al finalizar el juego (derrota).
   */
  revealAllBombs() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const cell = this.board[r][c];
        const cellElement = document.querySelector(
          `td[data-row="${r}"][data-column="${c}"]`
        );

        if (cell.getHasBomb()) {
          cellElement.classList.remove("covered");
          cellElement.classList.add("bomb");
          cellElement.textContent = "💣";
        }
      }
    }
  }

  /**
   * Comprueba si todas las celdas sin bombas están reveladas.
   * @returns {boolean} Si el jugador ha ganado.
   */
  static checkVictory() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const cell = this.board[r][c];
        const cellElement = document.querySelector(
          `td[data-row="${r}"][data-column="${c}"]`
        );

        if (!cell.getHasBomb() && cellElement.classList.contains("covered")) {
          return false; // Hay celdas no bombeadas aún tapadas
        }
      }
    }
    return true; // Todas las celdas no bombeadas están reveladas
  }
}
