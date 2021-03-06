const listElement = document.querySelector(".posts");
const postTemplate = document.querySelector("#single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
//   const promise = new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open(method, url);

//     //บรรทัดนี้ ทำให้เราไม่ต้องทำการ ใช้ JSON.parse อันนี้มันทำการ Pre config เรียบร้อยแล้ว
//     xhr.responseType = "json";

//     xhr.onload = () => {
//       if (xhr.status > 200 && xhr.status < 300) {
//         resolve(xhr.response);
//       } else {
//         reject(new Error("Something went wrong."));
//       }
//     };

//     xhr.onerror = () => {
//       reject(new Error("Faild to send request!"));
//     };

//     xhr.send(JSON.stringify(data));
//   });

//   return promise;

    return fetch(url, {
        method: method,
        body: data,
        // headers: {
        //     'Content-type': 'application/json'
        // }
        
    })
    .then(response => {
        if ( response.status >= 200 && response.status < 300 ) {
            return response.json();

        } 
        else 
        { // ถ้า url หรืออะไรไม่ถูกต้อง มันจะเข้ามาบรรทัดนี้
            return response.json().then(errData => {
                console.log(errData)
                throw new Error('Something went wrong - server-side')
            })
        }

    })
    //มันจะไม่ลงมาบรรทัดนี้ ก็ต่อเมื่อ internet ไม่ดี
    // .catch(error => {
    //     console.log(error)
    //     throw new Error('Something went wrong!')
    // })
}

async function fetchPost() {
  try {
    const response = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = response;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData();
  fd.append('title', title)
  fd.append('body', content)
  fd.append('userId', userId)

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", fetchPost);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    console.log(event.target);
    console.log(postId);

    const url = "https://jsonplaceholder.typicode.com/posts";
    sendHttpRequest("DELETE", `${url}/${postId}`);
  }
});
