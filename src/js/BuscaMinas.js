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
   * Comprueba que una dimensión (fila o columna) cumple con lo indicado (menor o igual que 20 y mayor o igual que 10)
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
      (this.columns * this.rows) / 6 < numberBombs &&
      (this.columns * this.rows) / 2 > numberBombs
    );
  }

  generateBoard() {
    //Generamos un array bidimensional de celdas con las dimensiones especificadas
    let board = [];
    let counter = this.bombsNumber;
    for (let i = 0; i < this.rows; i++) {
      board[i] = [];
      for (let j = 0; j < this.columns; j++) {
        board[i][j] = new Cell(i, j, false);
      }
    }

    //Repartimos las bombas de forma aleatoria por el tablero
    do {
      let row = parseInt(Math.random() * this.rows);
      let column = parseInt(Math.random() * this.columns);

      if (!board[row][column].getHasBomb()) {
        board[row][column].setHasBomb(true);
        counter--;
      }
    } while (counter > 0);

    //Constante con las diferentes celdas a revisar
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

    //Revisar y asignar el numero de bombas cercanas
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let nearBombs = 0;
        for (let [x, y] of directions) {
          let nearRow = r + x;
          let nearColumn = c + y;
          if (
            nearRow >= 0 &&
            nearRow < this.rows &&
            nearColumn >= 0 &&
            nearColumn < this.columns
          ) {
            if (board[nearRow][nearColumn].getHasBomb()) {
              nearBombs++;
            }
          }
        }
        board[r][c].setNearBombs(nearBombs);
      }
    }

    //Guardamos el tablero creado
    this.board = board;
  }

  /**
   * Devuelve el tablero en formato HTML
   * @returns {string} El tablero en formato HTML
   */
  printBoard() {
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
}
