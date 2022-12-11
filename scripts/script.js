let data;

const getDataEvents = async () => {
const response = await fetch("../scripts/events.json");
data = await response.json();
console.log("data",data);
return data;
}
getDataEvents();


setTimeout(() => {
  
  const dateConverter = (dateToCompare) => {
    const dateSplit = dateToCompare.split("-");
    const dateToCompareParsed = new Date(
      dateSplit[0],
      dateSplit[1] - 1,
      dateSplit[2]
    );
    const dateOfEvent = dateToCompareParsed.getTime();
    return dateOfEvent;
  };
  
  const actualDateInTimestamp = dateConverter(data.currentDate);
  
  const allEvents = data.events;
  const pastEvents = [];
  const upcomingEvents = [];
  
  const sectionHome = document.getElementById("section-home");
  const sectionPast = document.getElementById("section-past");
  const sectionUpcoming = document.getElementById("section-upcoming");
  
  const events = allEvents.map((event) => {
    const dateToCompare = event.date;
    dateOfEvent = dateConverter(dateToCompare);
  
    if (actualDateInTimestamp > dateOfEvent) {
      pastEvents.push(event);
    } else {
      upcomingEvents.push(event);
    }
  });
  
  let currentURL = window.location.pathname.split("/").pop();
  
  if (currentURL == "index.html") {
    showEvents(allEvents, sectionHome);
  } else if (currentURL == "past-events.html") {
    showEvents(pastEvents, sectionPast);
  } else if (currentURL == "upcoming-events.html") {
    showEvents(upcomingEvents, sectionUpcoming);
  }
  
  function showEvents(eventsArray, section) {
    let body = ``;
    console.log("eventsArray", eventsArray.name);
    let URL = "";
  
    if (section.id == "section-home") {
      URL = "./pages/details.html";
    } else {
      URL = "./details.html";
    }

    
    eventsArray.map((event) => {
        //<img src=${event.image} alt="Image not found"/>
        return (body += `
            <div class="card">
            <div class="image-card">
              <img src="../assets/noImage.jpg"> alt="Image not found"/>    
              </div>  
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">
                  ${event.description}
                </p>
                <div class="container-card-botton">
                <span>Price: $ ${event.price} </span>
                 <a href="${URL}?name=${event.name.replace(/\s/g,"")}" class="btn btn-color" target="_blank">View more</a>
                </div>
              </div>
            </div>
            `);
           
      });      
    section.innerHTML = body;
    
  }
  
  var arrayCategories = [];
  allEvents.forEach((categories) => arrayCategories.push(categories.category));
  arrayCategories = arrayCategories.filter((item, index) => {
    return arrayCategories.indexOf(item) === index;
  });
  console.log("arrayCategories", arrayCategories);
  
  function addCategories(arrayCategories) {
    let bodyCategories = ``;
    const tagToUpdate = document.getElementById("root-categories");
  
    const events = arrayCategories.map((category) => {
      return (bodyCategories += `
        <form class="form-check form-check-inline" id="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox"
          value=${category.replace(" ", "-")}
          />
          <label class="form-check-label" for="inlineCheckbox">${category} </label>      
      </form>
              `);
    });
    tagToUpdate.innerHTML = bodyCategories;
  }
  addCategories(arrayCategories);
  
  const formCheck = document.getElementById("root-categories");
  const inputsCheckbox = document.querySelectorAll(".form-check-input");
  
  formCheck.addEventListener("click", () => {
    var categoriesToShow = [];
  
    inputsCheckbox.forEach((inputCheckbox) => {
      if (inputCheckbox.checked) {
        console.log("Checkox selected:", inputCheckbox.value);
        categoriesToShow.push(inputCheckbox.value);
      }
    });
    eventsChecked(categoriesToShow);
  });
  
  const hiddenTitle = document.getElementById("hidden-title");
  
  function eventsChecked(categoriesToShow) {
    const eventsChecked = [];
    let flag = 0;
  
    if (currentURL == "index.html") {
      allEvents.map((event) => {
        for (let i = 0; i < categoriesToShow.length; i++) {
          if (categoriesToShow[i] == event.category.replace(" ", "-")) {
            eventsChecked.push(event);
            console.log("eventsChecked", eventsChecked);
            flag = 1;
          }
        }
      });
      showEvents(eventsChecked, sectionHome);
      if (flag == 0 && categoriesToShow.length != 0) {
        hiddenTitle.style.display = "block";
      } else if (categoriesToShow.length == 0) {
        showEvents(allEvents, sectionHome);
      }
    } else if (currentURL == "past-events.html") {
      pastEvents.map((event) => {
        for (let i = 0; i < categoriesToShow.length; i++) {
          if (categoriesToShow[i] == event.category.replace(" ", "-")) {
            eventsChecked.push(event);
            console.log("eventsChecked", eventsChecked);
            flag = 1;
          }
        }
      });
      showEvents(eventsChecked, sectionPast);
      if (flag == 0 && categoriesToShow.length != 0) {
        hiddenTitle.style.display = "block";
      } else if (categoriesToShow.length == 0) {
        showEvents(pastEvents, sectionPast);
      }
    } else if (currentURL == "upcoming-events.html") {
      upcomingEvents.map((event) => {
        for (let i = 0; i < categoriesToShow.length; i++) {
          if (categoriesToShow[i] == event.category.replace(" ", "-")) {
            eventsChecked.push(event);
            console.log("eventsChecked", eventsChecked);
            flag = 1;
          }
        }
      });
      showEvents(eventsChecked, sectionUpcoming);
      if (flag == 0 && categoriesToShow.length != 0) {
        hiddenTitle.style.display = "block";
      } else if (categoriesToShow.length == 0) {
        showEvents(upcomingEvents, sectionUpcoming);
      }
    }
  }
  
  // SEARCH
  
  const inputSearchEvent = document.getElementById("input-search-event");
  const eventListItems = document.querySelectorAll(".card");
  
  console.log("eventListItems", eventListItems);
  
  inputSearchEvent.addEventListener("keyup", (event) => {
    console.log(event.target.value);
  
    eventListItems.forEach((body) => {
      body.textContent.toLowerCase().includes(event.target.value.toLowerCase())
        ? (body.classList.remove("hidden"), (hiddenTitle.style.display = "none"))
        : body.classList.add("hidden")
        ? body.textContent == "undefined"
        : (hiddenTitle.style.display = "block");
    });
  });




}, "1000")



