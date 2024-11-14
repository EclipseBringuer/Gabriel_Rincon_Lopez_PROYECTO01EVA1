import { Cell } from "./Cell";

/**
 * Clase que representa el juego del Buscaminas
 */
export class BuscaMinas {
  /**
   * Crea un nuevo juego de Buscaminas
   * @param {number} columns - Representa el número de columnas
   * @param {number} rows - Representa el número de filas
   * @param {number} bombsNumber - Representa el número de bombas
   */
  constructor(columns, rows, bombsNumber) {
    this.columns = columns;
    this.rows = rows;
    this.bombsNumber = bombsNumber;
    this.board = this.createBoard();
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
   * Comprueba que una dimensión (fila o columna) cumple con lo indicado (menor o igual que 20 y mayor o igual que 10)
   * @returns {boolean} Si las dimensión cumple con los requisitos
   */
  validDimension(dimension) {
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

  createBoard() {}
}
