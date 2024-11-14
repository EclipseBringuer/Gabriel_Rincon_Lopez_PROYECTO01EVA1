export class Cell {
  constructor(column, row, hasBomb) {
    this.column = column;
    this.row = row;
    this.hasBomb = hasBomb;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  getHasBomb() {
    return this.hasBomb;
  }

  setRow(row) {
    this.row = row;
  }

  setColumn(column) {
    this.column = column;
  }

  setHasBomb(hasBomb) {
    return (this.hasBomb = hasBomb);
  }
}
