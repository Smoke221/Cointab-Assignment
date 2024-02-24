const postsContainer = document.querySelector("#posts-container");
const userContainer = document.querySelector("#user-container");
bulkAddButton = document.querySelector("#bulk-add");
downloadButton = document.querySelector("#excel-download");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

// Fetch user
fetch(`http://localhost:8000/${userId}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);

    displayUser(data.user);
  });
// Fetch posts for the specific user
fetch(`http://localhost:8000/posts/${userId}`)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);

    displayPosts(data.posts);

    if (data.posts && data.posts.length > 0) {
      // Posts exist, disable "Bulk Add" button and enable "Download" button
      bulkAddButton.disabled = true;
      downloadButton.disabled = false;
    } else {
      // No posts, enable "Bulk Add" button and disable "Download" button
      bulkAddButton.disabled = false;
      downloadButton.disabled = true;
    }
  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });

function displayPosts(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    let div = document.createElement("div");

    let postTitle = document.createElement("h4");
    postTitle.textContent = post.title;
    postTitle.setAttribute("class","postTitle")

    let body = document.createElement("p");
    body.textContent = post.body;
    body.setAttribute("class","postBody")

    div.append(postTitle, body);
    postsContainer.append(div);
  });
}
function displayUser(user) {
  userContainer.innerHTML = "";

  const userName = document.createElement("h3");
  userName.textContent = user.name;
  userName.style.fontFamily = "'Protest Strike', sans-serif";

  const company = document.createElement("p");
  company.textContent = user.company.name;
  company.style.fontFamily = "'Outfit', sans-serif"

  const city = document.createElement("p");
  city.textContent = user.address.city;
  city.style.fontFamily = "'Outfit', sans-serif"

  userContainer.append(userName, company, city);
}

function bulkAdd() {
  fetch(`http://localhost:8000/posts/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.posts && data.posts.length > 0) {
        // If there are posts, send a POST request to the server
        fetch(`http://localhost:8000/posts/addBulk/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.posts),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error("Error adding bulk posts:", error);
          });
      } else {
        console.log("No posts to add.");
      }
    })
    .catch((error) => {
      console.error("Error fetching posts for bulk add:", error);
    });
}

function downloadInExcel() {
  const downloadLink = document.createElement("a");
  downloadLink.href = `http://localhost:8000/posts/download-in-excel/${userId}`;
  downloadLink.download = "user_posts.xlsx";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function redirectToHome() {
  window.location.href = "index.html";
}
