const startGameBtn = document.getElementById('start-game-btn'); 

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW'
const RESULT_PLAYER_WINS = 'PLAYER_WINs'
const RESULT_COMPUTER_WINS = 'COMPUTER_WINs'

let gameIsruning = false

const getPlayerChoice = function() {
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
  if (
    selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS
  ) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return 
  } 
  else {
    return selection;
  }
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if ( randomValue < 0.34 ) {
    return ROCK;
  }
  if ( randomValue < 0.67 ) {
    return PAPER;
  }

  return SCISSORS;
  
}


const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE ) => 

  //เขียนแบบใช้ Ternary expression 
  //Arrow function ถ้ามีแค่ 1 expression ไม่จำเป็นต้องมี ปีกกา และ return ก็ได้
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;


  // if ( cChoice === pChoice ) {
  //   return RESULT_DRAW;
  // }
  // if (
  //   (cChoice === ROCK && pChoice === PAPER) ||
  //   (cChoice === PAPER && pChoice === SCISSORS) ||
  //   (cChoice === SCISSORS && pChoice === ROCK)
  // ) {
  //   return RESULT_PLAYER_WINS
  // }

  // return RESULT_COMPUTER_WINS


startGameBtn.addEventListener('click', () => {
  if ( gameIsruning ){
    return
  }
  gameIsruning = true;
  console.log("Game is starting...");
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if ( playerChoice ) {
    winner = getWinner(computerChoice, playerChoice);
  } else {
    //ส่งค่าไปแค่ ตัวเดียว ถ้าเป็นภาษาอื่นอาจจะมีปัญหา แต่ JS ไม่เป็น
    //แต่ก็ควรไปเขียน DAFULT VALUE ไว้ด้วย ถ้าไม่เขียนมันจะเป็น undefined
    winner = getWinner(computerChoice)
  }

  let message = `You pick ${playerChoice || DEFAULT_USER_CHOICE }, computer picked ${computerChoice}`;
  if (winner === RESULT_DRAW) {
    message = message + " had a draw.";
  }
  if (winner === RESULT_PLAYER_WINS) {
    message = message + " win";
  }
  if ( winner === RESULT_COMPUTER_WINS ) {
    message = message + " lost";
  }
  alert(message);
  gameIsruning = false;
});

// const sumUp = (numbers) => {
//   let sum = 0;
//   for ( const num of numbers) {
//     sum += num;
//   }

//   return sum
  
// }

// console.log(sumUp([1,2,3,4,8,9,10]))

//แบบใหม่ ใช้ spread operator จะดีกว่า
// const sumUp = (a, b, ...numbers) => {
//   const validateNumber = (number) => {
//     return isNaN(number) ? 0 : number;
//   }
//   let sum = 0; 
//   for ( const num of numbers) {
//     sum += validateNumber(num);
//   }

//   return sum
  
// }
// console.log(sumUp(1,2,3,8,9,10,50))

//แบบเก่า
// const subtract = function(){
//   let sum = 0; 
//   for ( const num of arguments) {
//     sum -= num;
//   }

//   return sum
  
// }

// console.log(subtract(1,2,3,4,8,9,10,50))  


//callback
const combine = (resultHandler, operation,  ...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  }
  let sum = 0; 
  for ( const num of numbers) {
    if (operation === 'ADD') {
      sum += validateNumber(num);
    } else {
      sum -= validateNumber(num)
    }
  }

  // callback function
  resultHandler(sum);
  
}

//argument ที่ส่งผ่าน bind จะเป็น argument แรกของ ฟังก์ชั่น
//เพราะฉะนั้นต้องเอา result ไปไว้ข้างหลัง
const showResult = (messageText, result) => {
  alert(messageText + result);
};

//argument ที่ส่งผ่าน bind จะเป็น argument แรกของ ฟังก์ชั่น
//มันจะไม่ถูกรันใน function แรกที่รัน แต่มันจะไปรันในฟังก์ชั่นที่สอง ก็คือ showResult หรือ resultHandler
combine(showResult.bind(this, 'The result addter adding all number is : '), 'ADD',1,2,3,8,9,10,50,500)
combine(showResult.bind(this, 'The result addter subtract all number is : '), 'subtract',1,2,3,8,9,10,50, 1000)

// const subtract = function(resultHandler, ...numbers){
//   let sum = 0; 
//   for ( const num of numbers) {
//     sum -= num;
//   }

//   resultHandler(sum);
// }

// console.log(subtract(showResult, 1,2,3,4,8,9,10,50)) 
