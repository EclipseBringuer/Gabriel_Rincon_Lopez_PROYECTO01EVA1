/**
 * Clase que representa una celda
 */
export class Cell {
  /**
   * Crea una celda del tablero de buscaminas
   * @param {number} row - La fila en la que se encuentra
   * @param {number} column - La columna en la que se encuentra
   * @param {boolean} hasBomb - Si tiene bomba o no
   */
  constructor(row, column, hasBomb) {
    this.row = row;
    this.column = column;
    this.hasBomb = hasBomb;
    this.nearBombs = 0;
  }

  /**
   * Devuelve la fila en la que se encuentra
   * @returns {number} La fila en la que se encuentra
   */
  getRow() {
    return this.row;
  }

  /**
   * Devuelve la columna en la que se encuentra
   * @returns {number} La columna en la que se encuentra
   */
  getColumn() {
    return this.column;
  }

  /**
   * Devuelve si hay bomba o no
   * @returns {boolean} Si hay una bomba o no
   */
  getHasBomb() {
    return this.hasBomb;
  }

  /**
   * Devuelve el número de bombas cercanas
   * @returns {number} Número de bombas cercanas
   */
  getNearBombs() {
    return this.nearBombs;
  }

  /**
   * Cambia el valor de bombas cercanas
   * @param {number} nearBombs - El número de bombas cercanas
   */
  setNearBombs(nearBombs) {
    this.nearBombs = nearBombs;
  }

  /**
   * Cambia el número de la fila
   * @param {number} row - La fila a poner
   */
  setRow(row) {
    this.row = row;
  }

  /**
   * Cambia el número de la columna
   * @param {number} column - La columna a poner
   */
  setColumn(column) {
    this.column = column;
  }

  /**
   * Cambia el valor de si hay bomba
   * @param {boolean} hasBomb - Si hay bomba o no
   */
  setHasBomb(hasBomb) {
    this.hasBomb = hasBomb;
  }
}
