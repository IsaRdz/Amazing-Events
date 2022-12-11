
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
    
    c = Math.round(assistance.length * 0.1);
    console.log("cantidad 10%",c);
    
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



}, "1000")


  