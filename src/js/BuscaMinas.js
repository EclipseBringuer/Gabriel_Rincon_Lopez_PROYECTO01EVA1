export class BuscaMinas {
  constructor(columns, rows, bombsNumber) {
    this.columns = columns;
    this.rows = rows;
    this.bombsNumber = bombsNumber;
    this.board = this.createBoard();
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setRows(rows) {
    this.rows = rows;
  }

  setBombsNumber(bombsNumber) {
    this.bombsNumber = bombsNumber;
  }

  getColumns() {
    return this.columns;
  }

  getRows() {
    return this.rows;
  }

  getBombsNumber() {
    return this.bombsNumber;
  }

  createBoard() {}
}
