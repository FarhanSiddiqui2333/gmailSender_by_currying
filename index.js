// menu handler
const createBtn = document.getElementById("createBtn");
const hideMenu = document.getElementById("hideMenu");

// Show menu on button click
createBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent document click from closing menu
  hideMenu.style.bottom = "0%"; // open menu
});

// Prevent menu clicks from closing the menu
hideMenu.addEventListener("click", (e) => {
  e.stopPropagation(); // stop bubbling to document
});

// Clicking outside menu & button closes the menu
document.addEventListener("click", () => {
  hideMenu.style.bottom = "-100%"; // close menu
});

//mail Sendind

const emailVal = document.getElementById("to");
const subjectVal = document.getElementById("subject");
const messageVal = document.getElementById("msg");
const Container = document.querySelector(".container .bottomMenu .messages");

function sendMail(email) {
  email = emailVal.value.trim();

  return function (subject) {
    subject = subjectVal.value.trim();

    return function (message) {
      message = messageVal.value.trim();

      let day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let date = new Date();

      let currentTime = `${day[date.getDay()]} ${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;

      const time = currentTime;

      if (!email || !subject || !message) {
        alert("Please fill in all fields before sending.");
        return;
      }

      const data = {
        name: "Farhan Siddiqui",
        email,
        subject,
        message,
        time,
        avatar: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      };

      if (data.email === "farhansiddiqui2333@gmail.com") {
        let url = "assets/avatar.png";
        data.avatar = url;
      }

      emailjs
        .send("service_64qndap", "template_884ptlb", data)
        .then(() => {
          // Add message to UI (optional)
          Container.innerHTML += `
            <div class="msg">
              <img src="${data.avatar}" alt="" />
              <p>
                <span class="name userGmail">${data.email}</span>
                <span class="userSubject">${data.subject}</span>
                <span class="msgTo userMsg">${data.message}</span>
              </p>
              <span class="time">${data.time}</span>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-ellipsis-vertical menu"></i>
            </div>
          `;

          // Clear input fields
          emailVal.value = "";
          subjectVal.value = "";
          messageVal.value = "";
        })
        .catch((error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send email. Please try again.");
        });
    };
  };
}
