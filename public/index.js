const fetchUsers = document.querySelector(".alluser-btn");
const usersContainer = document.querySelector("#users-info");
fetchUsers.addEventListener("click", () => {
  fetch("http://localhost:8000/users")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const allUsers = data;
      allUsers.forEach(async (e) => {
        let div = document.createElement("div");
        div.setAttribute("id", "user");

        let userName = document.createElement("h3");
        userName.textContent = e.name;
        let email = document.createElement("h5");
        email.textContent = e.email;
        let phone = document.createElement("h5");
        phone.textContent = e.phone;
        let website = document.createElement("h5");
        website.textContent = e.website;
        let city = document.createElement("h5");
        city.textContent = e.address.city;
        let company = document.createElement("h5");
        company.textContent = e.company.name;

        let divForButtons = document.createElement("div");
        divForButtons.setAttribute("class", "button-div");

        let openButton = document.createElement("button");
        openButton.textContent = "Open";
        openButton.setAttribute("disabled", "true");

        let addButton = document.createElement("button");
        addButton.textContent = "Add";
        addButton.addEventListener("click", () => {
          fetch("http://localhost:8000/addUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(e),
          });
        });

        // Fetch user existence information when rendering the user list
        const userExistenceResponse = await fetch(
          `http://localhost:8000/${e.id}`
        );
        const userExistenceData = await userExistenceResponse.json();

        if (userExistenceData.userExists) {
          // User exists in the database, enable the "Open" button and disable the "Add" button
          openButton.removeAttribute("disabled");
          addButton.setAttribute("disabled", "true");
        } else {
          // User doesn't exist in the database, enable the "Add" button and disable the "Open" button
          openButton.setAttribute("disabled", "true");
          addButton.removeAttribute("disabled");
        }

        divForButtons.append(openButton, addButton);

        div.append(
          userName,
          email,
          phone,
          website,
          city,
          company,
          divForButtons
        );
        usersContainer.append(div);
      });
    });
});
