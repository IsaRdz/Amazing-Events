  let data;
  let pastEvents = [];
  let upcomingEvents = [];

  const getDataEvents = async () => {
  const response = await fetch("../scripts/events.json");
  data = await response.json();
  console.log("data",data);
  
  eventsForDate();
  eventsStatistics();
  upcomingRevenues();
  pastsRevenues();
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
  
  
  function eventsForDate(){
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
  }
  

  function allCategories(){
    let arrayCategories = [];
    data.events.forEach((categories) => arrayCategories.push(categories.category));
    arrayCategories = arrayCategories.filter((item, index) => {
      return arrayCategories.indexOf(item) === index;
    });
    console.log("arrayCategories", arrayCategories);
    return arrayCategories;
  }
  

  
  function eventsStatistics(){
    let assistanceArray = [];
    let highestAssist = [];
    let lowestAssist = [];
    let largerCapacity = [];
    let c;
    
    data.events.map((event) => {

      let assistance
      if(event.assistance == undefined){
        assistance = event.estimate;
      } else if (event.estimate == undefined){
        assistance = event.assistance;
      }

      let eventStats = {
        "event" : event.name,
        "percentaje" : Math.round((assistance/event.capacity)*100),
        "capacity": event.capacity
      }
      assistanceArray.push(eventStats);
    });
    console.log("assistanceArray", assistanceArray)
    
    c = Math.round(assistanceArray.length * 0.1);
    console.log("cantidad 10%",c);
    
    highestAssist = assistanceArray.sort(function(a,b){return b.percentaje - a.percentaje}).slice(0, c);
    lowestAssist = assistanceArray.sort(function(a,b){return a.percentaje - b.percentaje}).slice(0, c);
    largerCapacity = assistanceArray.sort(function(a,b){return b.capacity - a.capacity}).slice(0, c);

    renderStatistics(highestAssist,lowestAssist,largerCapacity,c);

  }
  

  function upcomingRevenues(){
    let upcomingStats = [];
    arrayCategories = allCategories();
    
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
  

  function pastsRevenues(){
    let pastsStats = [];
    arrayCategories = allCategories();
    
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
  
  
  function renderStatistics(highestAssist,lowestAssist,largerCapacity,c){
    console.log("highestAssist",highestAssist);
    console.log("lowestAssist", lowestAssist);
    console.log("largerCapacity", largerCapacity);
    
    const eventsStatistics = document.getElementById("section-events-statistics");
    bodyStats = ``;

    for(let i=0; i<c; i++){

      bodyStats +=`
              <tr>
                <td>${highestAssist[i].event}: ${highestAssist[i].percentaje}%</td>
                <td>${lowestAssist[i].event}: ${lowestAssist[i].percentaje}%</td>
                <td>${largerCapacity[i].event}: ${largerCapacity[i].capacity}</td>
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
