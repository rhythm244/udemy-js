const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = async (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

//ถ้าใส่ async ฟังก์ชั่นนี้จะ return promise
async function trackUserHandler() {
  let posData;
  let timeData
  try {
    posData = await getPosition()
    timeData = await setTimer(1000);
  } catch(error) {
    console.log(error)
    // return;
  }
  
  console.log(timeData, posData);
}

button.addEventListener('click', trackUserHandler);

//อันไหนเร็วกว่า show แค่อันนั้น
//อาจเป็นเรื่องการ set timeout เวลาเรียก HTTP Request
// Promise.race([getPosition(), setTimer(1000)]).then(data => {
//   console.log(data)
// })

//เรียกโชว์มาทั้งหมด เก็บไว้ใน Array
//ต้อง resolve ทั้งหมด ถึงจะไม่เข้า catch error
// Promise.all([getPosition(), setTimer(1000)]).then(data => {
//   console.log(data)
// })

//จะโชว์มาทั้งหมดแม้จะมีตัวที่ reject
Promise.allSettled([getPosition(), setTimer(1000)]).then(data => {
  console.log(data)
})
// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);
