let data;
const pastEvents = [];
const upcomingEvents = [];
const formCheck = document.getElementById("root-categories");
const hiddenTitle = document.getElementById("hidden-title");
const inputSearchEvent = document.getElementById("input-search-event");
let currentURL;
const sectionHome = document.getElementById("section-home");
const sectionPast = document.getElementById("section-past");
const sectionUpcoming = document.getElementById("section-upcoming");



const getDataEvents = async () => {
  const response = await fetch("../scripts/events.json");
  data = await response.json();
  console.log("data",data);
  
  urlDetector();
  addCategories();
  
}
getDataEvents();

 
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
    
  
  function urlDetector(){
    const actualDateInTimestamp = dateConverter(data.currentDate);
    const events = data.events.map((event) => {
      const dateToCompare = event.date;
      dateOfEvent = dateConverter(dateToCompare);
    
      if (actualDateInTimestamp > dateOfEvent) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    });
    
    currentURL = window.location.pathname.split("/").pop();
    
    if (currentURL == "index.html") {
      showEvents(data.events, sectionHome);
    } else if (currentURL == "past-events.html") {
      showEvents(pastEvents, sectionPast);
    } else if (currentURL == "upcoming-events.html") {
      showEvents(upcomingEvents, sectionUpcoming);
    }
  }
   
  
  function showEvents(eventsArray, section) {
    let body = ``;
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

  function allCategories(){
    var arrayCategories = [];
    data.events.forEach((categories) => arrayCategories.push(categories.category));
    arrayCategories = arrayCategories.filter((item, index) => {
      return arrayCategories.indexOf(item) === index;
    });
    console.log("arrayCategories", arrayCategories);
    return arrayCategories;
  }
 
  
  function addCategories() {
    let bodyCategories = ``;
    arrayCategories = allCategories();
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
  
    
  formCheck.addEventListener("click", () => {
    const inputsCheckbox = document.querySelectorAll(".form-check-input");
    var categoriesToShow = [];
    
    inputsCheckbox.forEach((inputCheckbox) => {
      if (inputCheckbox.checked) {
        
        categoriesToShow.push(inputCheckbox.value);
      }
    });
    eventsChecked(categoriesToShow);
  });
  
  
  function eventsChecked(categoriesToShow) {
    
    const eventsChecked = [];
    let flag = 0;
    if (currentURL == "index.html") {
      
      data.events.map((event) => {
        for (let i = 0; i < categoriesToShow.length; i++) {
          if (categoriesToShow[i] == event.category.replace(" ", "-")) {
            eventsChecked.push(event);
            flag = 1;

          }
        }
      });
      showEvents(eventsChecked, sectionHome);
      if (flag == 0 && categoriesToShow.length != 0) {
        hiddenTitle.style.display = "block";
      } else if (categoriesToShow.length == 0) {
        showEvents(data.events, sectionHome);
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
  

  inputSearchEvent.addEventListener("keyup", (event) => {
    const eventListItems = document.querySelectorAll(".card");
    console.log(event.target.value);
  
    eventListItems.forEach((body) => {
      body.textContent.toLowerCase().includes(event.target.value.toLowerCase())
        ? (body.classList.remove("hidden"), (hiddenTitle.style.display = "none"))
        : body.classList.add("hidden")
        ? body.textContent == "undefined"
        : (hiddenTitle.style.display = "block");
    });
  });

  
const filterTitle = document.getElementById('filter-title');
const checks = document.getElementById('root-categories');
  
const screenSizeDetector = () =>{
  const screenWidth = screen.width;
  
  if(screenWidth < 625){
    checks.style.display = 'none';
    filterTitle.classList.remove('hidden');
    filterTitle.textContent = "Filter +";
    
    }else if(screenWidth > 625){
      checks.style.display = 'block';
      filterTitle.classList.add('hidden');
    }  
}

window.addEventListener("resize", screenSizeDetector);

filterTitle.addEventListener("click", () =>{

  if(checks.style.display == 'none'){
    checks.style.display = 'block';
    filterTitle.textContent = "Filter -";
  }else{
    checks.style.display = 'none';
    filterTitle.textContent = "Filter +";
  }
});


window.onscroll = () => {
  const buttonTop = document.querySelector("#buttonTop")
  if (document.documentElement.scrollTop > 100) {
    buttonTop.classList.add("shows")
  } else {
    buttonTop.classList.remove("shows")
  }
  buttonTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}




