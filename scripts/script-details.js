  let data;

  const getDataEvents = async () => {
  const response = await fetch("../scripts/events.json");
  data = await response.json();
  console.log("data",data);
  return data;
  }
  getDataEvents();

  setTimeout(() => {
    
    const sectionDetails = document.getElementById("section-details");

    const nameEvent = window.location.search.split("=").pop().replace("%27","");
    
    console.log("nameEvent", nameEvent)
    renderDetails(nameEvent);
  
  function renderDetails(nameEvent) {
    
    let bodyDetails = ``;
  
    data.events.map((event) => {

      let assistance
      if(event.assistance == undefined){
        assistance = event.estimate;
      } else if (event.estimate == undefined){
        assistance = event.assistance;
      }
      
          if (event.name.replaceAll(" ", "").replace("'","") == nameEvent) {
              console.log(event.name.replaceAll(" ", ""))
              console.log(nameEvent)

                return (bodyDetails += `
              <div class="container mx-auto mt-5">
                <div class="card-details p-4">
                  <div class="row g-0">
                    <div
                      class="col-md-4 d-flex align-items-center justify-content-center"
                    >
                      <img
                        src="../assets/salida-al-museo5.jpg"
                        class="img-fluid rounded-start shadow-card"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body-details border p-4">
                        <h4 class="card-title">${event.name}</h4>
                        <p><span>Date:</span> ${event.date}</p>
                        <p><span>Description:</span> ${event.description}</p>
                        <p><span>Category:</span> ${event.category}</p>
                        <p><span>Place:</span> ${event.place} </p>
                        <p><span>Capacity:</span> ${event.capacity} </p>
                        <p><span>Assistance or estimate:</span> ${assistance} </p>
                        <p><span>Price:</span> $ ${event.price} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `);
             
              
            }
           
    });
    sectionDetails.innerHTML = bodyDetails;
  }



  }, "1000")

  
