import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Game(부모)은 Board(자식)를 호출, Board(부모)는 Square(자식)를 호출
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
/*
class Square extends React.Component {
  // 생성자
  constructor(props) {
    super(props);
    // 무언가를 기억하기 위해 this.state를 설정하여 state를 가짐
    // Square의 현재값을 this.state에 저장하고 Square를 클릭하는 경우 변경
    this.state = {
      value: null, // 초기화
    };
  }
  
  render() {
    return (
      // 기존에 있던 i(숫자)들을 클릭하면 this.setState가 호출되며 X로 변경
      <button
        className="square"
        onClick={() => this.props.onClick()} // this.setState({ value: "X" })}>
      >
        {this.props.value}
      </button>
    ); // Board 컴포넌트에서 받아온 데이터를 표시
  }
}
  */

// Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달
class Board extends React.Component {
  // 생성자 - Board(부모)컴포넌트에 공유 state를 정의, props를 사용해 자식 컴포넌트에 state를 다시 전달(동기화)
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // 9개의 Square 상태를 관리하는 9개의 null 배열을 초기 state로 설정
      // X가 사각형에 출력되고 나서는 O가 출력는 것으로 값을 뒤집음(boolean)
      xIsNext: true,
    };
  }

  handleClick(i) {
    // 기존의 배열을 수정하지않고 .slice() 연산자를 사용해 squares 배열의 사본을 생성
    const squares = this.state.squares.slice();
    // 플레이어가 수를 둘 대마다 boolean값이 뒤집혀 다음 플레이어를 결정할 수 있도록함
    squares[i] = this.state.xIsNext ? "X" : "O"; // squares[i] = "X";
    this.setState({
      squares: squares,
      // X와 O가 번갈아 나올 수 있도록 상태를 변경
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      // Square를 클릭하면 Board에서 넘겨받은 onClick함수가 호출됨
      <Square
        // props1: 각 Square에 X, O, null을 표현할 수 있도록 작성
        value={this.state.squares[i]}
        // props2: 사각형을 클릭시마다 함수를 호출
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "WINNER: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    /*
    012
    345
    678
    */
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// 승부가 나는 함수
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
