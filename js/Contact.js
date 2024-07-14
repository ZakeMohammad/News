let Tranding= document.querySelector('.Tranding');


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/Tranding')
.then(Response=> {
    console.log(Response);
return Response.json();
 })
.then(data=>{
    RenderTrandingNews(data);
});

 const RenderTrandingNews=(Data)=>{
    Tranding.innerHTML='';
    for (const [image, details] of Object.entries(Data)) {
        Tranding.innerHTML=`
        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Tranding/${image}" class="img-fluid rounded-circle border border-3 border-primary me-2" style="width: 30px; height: 30px;  margin-left: 20px;" alt="">
        <a href="detail-page.html" style=" width: 500px; height: 16px;"><p class="text-white mb-0 link-hover">${details}</p></a>
            `;
        console.log("Image:", image);
        console.log("Details:", details);
    }
};
function ConvertDate(Datefor){
    let date = new Date(Datefor);
    let options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
 return date.toLocaleDateString('en-US', options);
}


fetch('https://worldtimeapi.org/api/timezone/Etc/UTC')
  .then(response => response.json())
  .then(data => {
    const currentDate = new Date(data.datetime);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    document.querySelectorAll('.CurrentDate').forEach(element => {
        element.textContent = formattedDate;
      });
  })
  .catch(error => console.error('Error fetching date:', error));



  const apiKey = 'aadf318e8f57c69130e4da6b95162e11'; 
const city = 'Amman'; 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const cityName = data.name;
    const temperature = data.main.temp;

    console.log(`City: ${cityName}`);
    console.log(`Temperature: ${temperature}°C`);

    document.querySelectorAll('.CurrentCity').forEach(element => {
      element.textContent = cityName;
    });
    document.querySelectorAll('.CurrentTemperature').forEach(element => {
      element.textContent = `${temperature}°C`;
    });
  })
  .catch(error => console.error('Error fetching weather data:', error));



  let SocialMedia= document.querySelector('.SoicalMedia');

fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/SocialMedia')
.then(Response=> {
return Response.json();
 })
.then(data=>{
    RenderSocialMedia(data);
});

 const RenderSocialMedia=(Data)=>{
console.log(Data);

    Data.forEach(data=>{
        if(data.socialmediaName=='Fasbook'){
            document.querySelectorAll('.Fasbook').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='Twitter'){
            document.querySelectorAll('.Twitter').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='Instegram'){
            document.querySelectorAll('.Instegram').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='youtube'){
            document.querySelectorAll('.Youtube').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='Linkdin'){
            document.querySelectorAll('.Linkdin').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='Skype'){
            document.querySelectorAll('.Skype').forEach(element => {
                element.href =data.url;
              });
        }

        if(data.socialmediaName=='Printtest'){
            document.querySelectorAll('.Pintrest').forEach(element => {
                element.href =data.url;
              });
        }


    });
};


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/LatestTwoNews')
.then(response=>{return response.json()})
.then(Data=>{RenderLastTow(Data)});


const RenderLastTow=(Data)=>{
    console.log(Data)
let Content=document.getElementById('FotterPost');
Content.innerHTML='';
let counter=0;

Data.forEach(data=>{
    if(counter==0){
        Content.innerHTML+=` 
        <div class="d-flex flex-column mb-4">
                                        <h4 class="mb-4 text-white">Recent Posts</h4>
                                        <a  href="detail-page.html?id=${data[0]}">
                                            <div class="d-flex align-items-center">
                                                <div style="width: 100px;" class="rounded-circle border border-2 border-primary overflow-hidden">
                                                    <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[4]}" style="height: 100px;" class="img-zoomin img-fluid rounded-circle w-100" alt="">
                                                </div>
                                                <div class="d-flex flex-column ps-4">
                                                    <p class="text-uppercase text-white mb-3">${data[3]}</p>
                                                    <a href="detail-page.html?id=${data[0]}" class="h6 text-white">
                                                       ${data[1]}
                                                    </a>
                                                    <small class="text-white d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
            `;
    }
    else{
        Content.innerHTML+=` 
        <div class="d-flex flex-column">
                                <a  href="detail-page.html?id=${data[0]}">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 100px;" class="rounded-circle border border-2 border-primary overflow-hidden">
                                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[4]}" style="height: 100px;"  class="img-zoomin img-fluid rounded-circle w-100" alt="">
                                        </div>
                                        <div class="d-flex flex-column ps-4">
                                            <p class="text-uppercase text-white mb-3">${data[3]}</p>
                                            <a href="detail-page.html?id=${data[0]}" class="h6 text-white">
                                                 ${data[1]}
                                            </a>
                                            <small class="text-white d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                                        </div>
                                    </div>
                                </a>
                            </div>
            `;
    }
 
   
    counter++;
})


};


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/GategoresPhotos')
.then(response=>{return response.json()})
.then(Data=>{RenderPhotos(Data)});


const RenderPhotos=(Data)=>{
    console.log(Data)
let Content=document.getElementById('GategorePhotots');
Content.innerHTML='';
Data.forEach(data=>{
    Content.innerHTML+=` 
    <div class="col-4">
                                    <div class="rounded overflow-hidden">
                                        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Gategores/${data}" class="img-zoomin img-fluid rounded w-100" alt="">
                                    </div>
    </div>
    `;
})
};




document.querySelector('.SubscribeForm').addEventListener('submit',function(event){
          
    event.preventDefault();
    let Email = document.getElementById('email').value;
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Subscriber?Email=${Email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.text().then(text => {
            console.log(text);
                var myButton = document.getElementById('myBtn');
                if (myButton) {
                    myButton.click();
                }
                document.getElementById('MessegeForSubs').innerText = text;
                return Promise.reject(`Failed to subscribe: ${text}`);
            
            return text;
        });
    });
});

