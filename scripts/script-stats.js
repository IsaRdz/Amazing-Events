const data = {
  fechaActual: "2022-01-01",
  eventos: [
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas7.jpg",
      name: "Collectivities Party",
      date: "2021-12-12",
      description:
        "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
      category: "Food Fair",
      place: "Room A",
      capacity: 45000,
      assistance: 42756,
      price: 5,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas2.jpg",
      name: "Korean style",
      date: "2021-08-12",
      description:
        "Enjoy the best Korean dishes, with international chefs and awesome events.",
      category: "Food Fair",
      place: "Room A",
      capacity: 45000,
      assistance: 42756,
      price: 10,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo5.jpg",
      name: "Jurassic Park",
      date: "2021-11-02",
      description:
        "Let's go meet the biggest dinosaurs in the paleontology museum.",
      category: "Museum",
      place: "Field",
      capacity: 82000,
      assistance: 65892,
      price: 15,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo1.jpg",
      name: "Parisian Museum",
      date: "2022-11-02",
      description:
        "A unique tour in the city of lights, get to know one of the most iconic places.",
      category: "Museum",
      place: "Paris",
      capacity: 8200,
      estimate: 8200,
      price: 3500,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces2.jpg",
      name: "Comicon",
      date: "2021-02-12",
      description:
        "For comic lovers, all your favourite characters gathered in one place.",
      category: "Costume Party",
      place: "Room C",
      capacity: 120000,
      assistance: 110000,
      price: 54,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces1.jpg",
      name: "Halloween Night",
      date: "2022-02-12",
      description: "Come with your scariest costume and win incredible prizes.",
      category: "Costume Party",
      place: "Room C",
      capacity: 12000,
      estimate: 9000,
      price: 12,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica1.jpg",
      name: "Metallica in concert",
      date: "2022-01-22",
      description: "The only concert of the most emblematic band in the world.",
      category: "Music Concert",
      place: "Room A",
      capacity: 138000,
      estimate: 138000,
      price: 150,
    },
    {
      image:
        "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica2.jpg",
      name: "Electronic Fest",
      date: "2021-01-22",
      description:
        "The best national and international DJs gathered in one place.",
      category: "Music Concert",
      place: "Room A",
      capacity: 138000,
      assistance: 110300,
      price: 250,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton3.jpg",
      name: "10K for life",
      date: "2021-03-01",
      description: "Come and exercise, improve your health and lifestyle.",
      category: "Race",
      place: "Campo de FutbÃ³l",
      capacity: 30000,
      assistance: 25698,
      price: 3,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton1.jpg",
      name: "15K NY",
      date: "2021-03-01",
      description:
        "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
      category: "Race",
      place: "New York",
      capacity: 3000000,
      assistance: 2569800,
      price: 3,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Libros7.jpg",
      name: "School's book fair",
      date: "2022-10-15",
      description: "Bring your unused school book and take the one you need.",
      category: "Book Exchange",
      place: "Room D1",
      capacity: 150000,
      estimate: 123286,
      price: 1,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Libros3.jpg",
      name: "Just for your kitchen",
      date: "2021-11-09",
      description:
        "If you're a gastronomy lover come get the cookbook that best suits your taste and your family's.",
      category: "Book Exchange",
      place: "Room D6",
      capacity: 130000,
      assistance: 90000,
      price: 100,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Cine3.jpg",
      name: "Batman",
      date: "2021-3-11",
      description: "Come see Batman fight crime in Gotham City.",
      category: "Cinema",
      place: "Room D1",
      capacity: 11000,
      assistance: 9300,
      price: 225,
    },
    {
      image: "https://amazingeventsapi.herokuapp.com/api/img/Cine7.jpg",
      name: "Avengers",
      date: "2022-10-15",
      description:
        "Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
      category: "Cinema",
      place: "Room D1",
      capacity: 9000,
      estimate: 9000,
      price: 250,
    },
  ],
};
 

  /*const getDataEvents = async () => {
  const response = await fetch("../scripts/events.json");
  const data = await response.json();
  console.log("data",data);
}
getDataEvents();*/


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
  
  const actualDateInTimestamp = dateConverter(data.fechaActual);
  const allEvents = data.eventos;
  let pastEvents = [];
  let upcomingEvents = [];
  
  const events = allEvents.map((event) => {
    const dateToCompare = event.date;
    dateOfEvent = dateConverter(dateToCompare);
  
    if (actualDateInTimestamp > dateOfEvent) {
      pastEvents.push(event);
    } else {
      upcomingEvents.push(event);
    }
  });
  
  let arrayCategories = [];
  allEvents.forEach((categories) => arrayCategories.push(categories.category));
  arrayCategories = arrayCategories.filter((item, index) => {
    return arrayCategories.indexOf(item) === index;
  });
  console.log("arrayCategories", arrayCategories);

  
  function eventsStatistics(){
    let assistance = [];
    let highestAssist = [];
    let lowestAssist = [];
    let c;
    
    pastEvents.map((event) => {
      let eventStats = {
        "event" : event.name,
        "percentaje" : (event.assistance/event.capacity)*100,
        "capacity": event.capacity
      }
      assistance.push(eventStats);
    });
    
    c = Math.round(assistance.length * 0.5);
    console.log("cantidad 50%",c);
    
    highestAssist = assistance.sort(function(a,b){return b.percentaje - a.percentaje}).slice(0, c);
    console.log("assistance",assistance);


    renderStatistics(highestAssist);

  }
  eventsStatistics();

  function upcomingRevenues(){
    let upcomingStats = [];

    for(let i=0; i<arrayCategories.length;i++){
      let category;
      let revenue = 0;
      let percentaje = 0;
      //console.log("category: ",arrayCategories[i]);
      upcomingEvents.map((event) => {
        if(event.category == arrayCategories[i]){
          category = arrayCategories[i];
          revenue += event.estimate * event.price;
          percentaje += ( event.estimate / event.capacity ) * 100;
        } 
      })
      if(category == undefined){
          category = arrayCategories[i];
          revenue = 0;
          percentaje = 0;
        }
      
      //console.log(`category: ${category}, revenue: ${revenue}, percentaje: ${percentaje} `)
      let stats = {
        "category" : category,
        "revenue" : revenue,
        "percentaje" : Math.round(percentaje) 
      }
      upcomingStats.push(stats);
    }
    console.log("upcomingStats", upcomingStats);
    renderUpcomingStats(upcomingStats);
  }
  upcomingRevenues();

  function pastsRevenues(){
    let pastsStats = [];

    for(let i=0; i<arrayCategories.length;i++){
      let category;
      let revenue = 0;
      let percentaje = 0;
      //console.log("category: ",arrayCategories[i]);
      pastEvents.map((event) => {
        if(event.category == arrayCategories[i]){
          category = arrayCategories[i];
          revenue += event.assistance * event.price;
          percentaje += ( event.assistance / event.capacity ) * 100;
        } 
      })
      if(category == undefined){
          category = arrayCategories[i];
          revenue = 0;
          percentaje = 0;
        }
      
      //console.log(`category: ${category}, revenue: ${revenue}, percentaje: ${percentaje} `)
      let stats = {
        "category" : category,
        "revenue" : revenue,
        "percentaje" : Math.round(percentaje) 
      }
      pastsStats.push(stats);
    }
    console.log("pastsStats", pastsStats);
    renderPastStats(pastsStats);
  }
  pastsRevenues();


  
  function renderStatistics(assistance){
    console.log("render assistance",assistance);
    const eventsStatistics = document.getElementById("section-events-statistics");
    bodyStats = ``;

    for(let assist of assistance){
      bodyStats +=`
      <tr>
        <td>${assist.event}: ${ Math.round(assist.percentaje)}%</td>
        <td>${assist.event}: ${ Math.round(assist.percentaje)}%</td>
        <td>${assist.event}: ${assist.capacity}</td> 
      </tr>
    `;
    }      
    eventsStatistics.innerHTML = bodyStats;
  }

  function renderUpcomingStats(upcomingStats){
    const sectionUpcomingStats = document.getElementById("section-upcoming-stats");
    body = ``;

    for(let stats of upcomingStats){
      body += `
      <tr>
        <td> ${stats.category} </td>
        <td> $ ${stats.revenue} </td>
        <td> ${stats.percentaje} % </td>
      </tr>
      `;
    }
    sectionUpcomingStats.innerHTML = body;
  }

  function renderPastStats(pastsStats){
    const sectionPastStats = document.getElementById("section-past-stats");
    body = ``;

    for (let stats of pastsStats){
      body += `
      <tr>
        <td> ${stats.category} </td>
        <td> $ ${stats.revenue} </td>
        <td> ${stats.percentaje} %</td>
        </tr>
      `
    };
    sectionPastStats.innerHTML = body;
  }