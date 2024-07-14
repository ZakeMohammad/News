localStorage.clear();

let Tranding= document.querySelector('.Tranding');


fetch('https://zakimohammad2-001-site1.etempurl.com/api/Content/Tranding')
.then(Response=> {

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




let GategoresTop= document.querySelector('.GategoresTop');
let GategoresRith= document.querySelector('.GategoresRith');
fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/Gategoes')
.then(Response=> {
return Response.json();
 })
.then(data=>{
    RenderGategores(data);
});

 const RenderGategores=(Data)=>{
    GategoresTop.innerHTML='';
    GategoresRith.innerHTML='';

    Data.forEach(data=>{

        GategoresTop.innerHTML+=`
        <div class="col-md-6 col-lg-6 col-xl-3">
                        <div class="row g-4 align-items-center features-item">
                            <div class="col-4">
                                <div class="rounded-circle position-relative">
                                    <div class="overflow-hidden rounded-circle">
                                        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Gategores/${data.image}" class="img-zoomin img-fluid rounded-circle w-100" alt="">
                                    </div>
                                    <span class="rounded-circle border border-2 border-white bg-primary btn-sm-square text-white position-absolute" style="top: 10%; right: -10px;">${data.numberOfNews}</span>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="features-content d-flex flex-column">
                                    <p class="text-uppercase mb-2">${data.name}</p>
                                    <a href="#" class="h6">
                                      ${data.detalis}
                                    </a>
                                    <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> 
                                    ${ConvertDate(data.lastNewsDate)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        GategoresRith.innerHTML+=`
         <div class="col-12">
                        <div class="row g-4 align-items-center features-item">
                            <div class="col-4">
                                <div class="rounded-circle position-relative">
                                    <div class="overflow-hidden rounded-circle">
                                        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Gategores/${data.image}" class="img-zoomin img-fluid rounded-circle w-100" alt="">
                                    </div>
                                    <span class="rounded-circle border border-2 border-white bg-primary btn-sm-square text-white position-absolute" style="top: 10%; right: -10px;">${data.numberOfNews}</span>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="features-content d-flex flex-column">
                                    <p class="text-uppercase mb-2">${data.name}</p>
                                    <a href="#" class="h6">
                                      ${data.detalis}
                                    </a>
                                    <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> 
                                    ${ConvertDate(data.lastNewsDate)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
   
    });
    GategoresRith.innerHTML+=`
    <div class="col-lg-12">
        <a href="#" class="link-hover btn border border-primary rounded-pill text-dark w-100 py-3 mb-4">Home</a>
    </div>`;

};


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/TopTwoViews')
.then(response=>{return response.json()})
.then(Data=>{RenderTopTwoNews(Data)});


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/GetRandomNews')
.then(response=>{return response.json()})
.then(Data=>{RenderRandom7(Data)});



const RenderTopTwoNews=(Data)=>{
document.getElementById('TopOneNews').innerHTML=`
 <div class="position-relative overflow-hidden rounded">
                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${Data[0].firstImage}" class="img-fluid rounded img-zoomin w-100" alt="">
                            <div class="d-flex justify-content-between" w>
                               
                                <a href="#" class="text-dark me-3 link-hover"><i class="fa fa-eye"></i>${Data[0].views} Views</a>
                                <a href="#" class="text-dark me-3 link-hover"><i class="fa fa-comment-dots"></i> ${Data[0].commints} Comment</a>
                                <a href="#" class="text-dark link-hover"><i class="fa fa-arrow-up"></i> ${Data[0].shares} Share</a>
                            </div>
                        </div>
                        <div class="border-bottom py-3">
                            <a href="detail-page.html?id=${Data[0].id}" class="display-4 text-dark mb-0 link-hover">${Data[0].titel}</a>
                        </div>
                        <p class="mt-3 mb-4">${Data[0].description}
                        </p>`;

document.getElementById('TopTwoNews').innerHTML=`
      <div class="news-2">
                                <h3 class="mb-4">Top Story</h3>
                            </div>
                            <div class="row g-4 align-items-center">
                                <div class="col-md-6">
                                    <div class="rounded overflow-hidden">
                                        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${Data[1].firstImage}" style="height: 250px;" class="img-fluid rounded img-zoomin w-100" alt="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex flex-column">
                                        <a href="detail-page.html?id=${Data[1].id}"  class="h3">${Data[1].titel}</a>
                                        <p class="mb-0 fs-5"><i class="fa fa-comment-dots"> ${Data[1].commints} Comment</i> </p>
                                        <p class="mb-0 fs-5"><i class="fa fa-eye"> ${Data[1].views} Views</i></p>
                                    </div>
                                </div>
                            </div>
`;
}


const RenderRandom7=(Data)=>{
  
let Content=document.getElementById('Random7');

let coutner=0;
Data.forEach(data=>{
    if(coutner===0){
        Content.innerHTML+=`
            <div class="col-12">
                                    <div class="rounded overflow-hidden">
                                        <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data.firstImage}" class="img-fluid rounded img-zoomin w-100"  alt="">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-flex flex-column">  
                                        <a href="detail-page.html?id=${data.id}" class="h4 mb-2">${data.titel}</a>
                                        <p class="fs-5 mb-0"><i class="fa fa-comment-dots"> ${data.commints} Comment</i>  </p>
                                        <p class="fs-5 mb-0"><i class="fa fa-eye"> ${data.views} Views </i></p>
                                    </div>
                                </div>
        `;
    }
    else{
        Content.innerHTML+=`
       <div class="col-12">
                                    <div class="row g-4 align-items-center">
                                        <div class="col-5">
                                            <div class="overflow-hidden rounded">
                                                <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data.firstImage}" class="img-zoomin img-fluid rounded w-100" style="height: 100px;" alt="">
                                            </div>
                                        </div>
                                        <div class="col-7">
                                            <div class="features-content d-flex flex-column">
                                                <a href="detail-page.html?id=${data.id}" class="h6">${data.titel}</a>
                                                <small><i class="fa fa-comment-dots"> ${data.commints} Comment</i> </small>
                                                <small><i class="fa fa-eye"> ${data.views} Views</i></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    `;
    };
    coutner++;
})


}

$(document).ready(function() {
   
    const initializeOwlCarousel = () => {
        $('.latest-news-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    };


    fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/LastTenNews')
        .then(response => response.json())
        .then(data => {
            RenderLastTen(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

  
    const RenderLastTen = (Data) => {
        let Content = document.getElementById('LastTen');
        
        Content.innerHTML = '';

        Data.forEach(data => {
            Content.innerHTML += `
                <div class="latest-news-item">
                    <div class="bg-light rounded">
                        <div class="rounded-top overflow-hidden">
                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[4]}" style="height:200px;" class="img-zoomin img-fluid rounded-top w-100" alt="">
                        </div>
                        <div class="d-flex flex-column p-4">
                            <a href="detail-page.html?id=${data[0]}" class="h4">${data[1]}</a>
                            <div class="d-flex justify-content-between">
                                <a href="#" class="small text-body link-hover">By ${data[3]}</a>
                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

    
        $('.latest-news-carousel').owlCarousel('destroy');
        initializeOwlCarousel();
    };

    initializeOwlCarousel();
});




$(document).ready(function() {
   
    const initializeOwlCarousel = () => {
        $('.whats-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    };


    fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/TopFourNewsInGategore')
        .then(response => response.json())
        .then(data => {
            RenderTopGategores(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

  
    const RenderTopGategores= (Data) => {
        let Content = document.getElementById('TopGategoes');
  
        Content.innerHTML = '';
        let counter=0;
        Data.forEach(data => {
            counter++;
            if(counter==1){
                Content.innerHTML += `
                <div class="latest-news-item">
                    <div class="bg-light rounded">
                        <div class="rounded-top overflow-hidden">
                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[5]}" style="height:200px;" class="img-zoomin img-fluid rounded-top w-100" alt="">
                        </div>
                        <div class="d-flex flex-column p-4">
                            <a href="detail-page.html?id=${data[0]}" class="h4">${data[1]}</a>
                            <div class="d-flex justify-content-between">
                                <a href="#" class="small text-body link-hover">By ${data[3]}</a>
                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }
            else{
                Content.innerHTML += `
                <div class="whats-item">
                    <div class="bg-light rounded">
                        <div class="rounded-top overflow-hidden">
                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[5]}" style="height:200px;" class="img-zoomin img-fluid rounded-top w-100" alt="">
                        </div>
                        <div class="d-flex flex-column p-4">
                            <a href="detail-page.html?id=${data[0]}" class="h4">${data[1]}</a>
                            <div class="d-flex justify-content-between">
                                <a href="#" class="small text-body link-hover">By ${data[3]}</a>
                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            }
          
        });

    
        $('.whats-carousel').owlCarousel('destroy');
        initializeOwlCarousel();
    };

    initializeOwlCarousel();
});


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/RandomLifeStyle')
.then(response=>{return response.json()})
.then(Data=>{RenderRandomLIifeStyle(Data)});


const RenderRandomLIifeStyle=(Data)=>{
   
let Content=document.getElementById('lifestylee');
Content.innerHTML='';
Data.forEach(data=>{
    Content.innerHTML+=`  <div class="col-lg-6">
                                        <div class="lifestyle-item rounded">
                                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[4]}" style="height:400px;" class="img-fluid w-100 rounded" alt="">
                                            <div class="lifestyle-content">
                                               <div class="mt-auto">
                                                    <a href="detail-page.html?id=${data[0]}" class="h4 text-white link-hover">${data[1]}</a>
                                                    <div class="d-flex justify-content-between mt-4">
                                                        <a href="#" class="small text-white link-hover">By ${data[3]}</a>
                                                        <small class="text-white d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data[2])}</small>
                                                    </div>
                                               </div>
                                            </div>
                                        </div>
                                    </div>`;
});


};




fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/LatestTwoNews')
.then(response=>{return response.json()})
.then(Data=>{RenderLastTow(Data)});


const RenderLastTow=(Data)=>{
 
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


fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/ActiveAdds')
.then(response=>{return response.json()})
.then(Data=>{RenderAdds(Data)});


const RenderAdds=(Data)=>{

let Content=document.getElementById('Adds');
Content.innerHTML='';
Data.forEach(data=>{
    Content.innerHTML+=` 
   <div class="position-relative banner-2" id="Adds">
                                                    <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Adds/${data[4]}"  class=" w-100 rounded" alt="">
                                                    <div class="text-center ">
                                                        <h6 class="mb-2">${data[3]}</h6>
                                                        <p class="text-dark mb-2"></p>
                                                        <a target="_blank" href="${data[1]}" class="btn btn-primary text-white px-4">Visit it</a>
                                                    </div>
                                                </div>
    `;
})


};

let ConvertTime=(inputDateStr)=>{
    let dateObj = new Date(inputDateStr);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = monthNames[dateObj.getMonth()];
    let day = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes().toString().padStart(2, '0');
    

    return  `${hours}:${minutes}, ${month} ${day}`;
}



fetch(' https://zakimohammad2-001-site1.etempurl.com/api/News/MostViews')
.then(response=> {return response.json()})
.then(Data=>{RenderHeaderGategores(Data)});


const RenderHeaderGategores=(Data)=>{
    let counter=1;
document.getElementById(`HeaderTab1`).innerHTML='';
document.getElementById(`HeaderTab2`).innerHTML='';
document.getElementById(`HeaderTab3`).innerHTML='';
document.getElementById(`HeaderTab4`).innerHTML='';

Data.forEach(data=>{

    document.getElementById(`HeaderTab${counter}`).innerHTML+=`
 <div class="position-relative rounded overflow-hidden">
                                                <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[9]}" style="height: 450px;" class="img-zoomin img-fluid rounded w-100" alt="">
                                                <div class="position-absolute text-white px-4 py-2 bg-primary rounded" style="top: 20px; right: 20px;">                                              
                                                ${data[1]}
                                                </div>
                                            </div>
                                            <div class="my-4">
                                                <a href="detail-page.html?id=${data[2]}" class="h4">${data[3]}</a>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <a href="#" class="text-dark link-hover me-3"><i class="fa fa-clock"></i> ${ConvertTime(data[7])}</a>
                                                <a href="#" class="text-dark link-hover me-3"><i class="fa fa-eye"></i> ${data[4]} Views</a>
                                                <a href="#" class="text-dark link-hover me-3"><i class="fa fa-comment-dots"></i> ${data[6]} Comment</a>
                                                <a href="#" class="text-dark link-hover"><i class="fa fa-arrow-up"></i> ${data[5]} Share</a>
                                            </div>
                                            <p class="my-4">${data[8]}
                                            </p>
    `;
    
    counter++;
});
};

let BodySport=document.getElementById('BodyTab1');
let BodyTechnologe=document.getElementById('BodyTab2');
let BodyFashion=document.getElementById('BodyTab3');
let BodyLifeStyle=document.getElementById('BodyTab4');

let SportContent='';
let TechnologContent='';
let FashionContent='';
let LifeStyleContent='';
let SportPageNumberCount=1;
let TechnologPageNumberCount=1;
let FashionPageNumberCount=1;
let LifeStylePageNumberCount=1;


let SportPagesNumber, TechnologPagesNumber, FashionPagesNumber, LifeStylePagesNumber;

const FillPagesNumbers = () => {
    const fetchPromises = [
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=10&PuplisherID=0&GategoreID=1&NewsID=0`)
            .then(response => response.json())
            .then(data => SportPagesNumber = data),

        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=10&PuplisherID=0&GategoreID=2&NewsID=0`)
            .then(response => response.json())
            .then(data => TechnologPagesNumber = data),

        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=10&PuplisherID=0&GategoreID=3&NewsID=0`)
            .then(response => response.json())
            .then(data => FashionPagesNumber = data),

        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=10&PuplisherID=0&GategoreID=4&NewsID=0`)
            .then(response => response.json())
            .then(data => LifeStylePagesNumber = data)
    ];

    Promise.all(fetchPromises).then(() => {
     
    });
}

FillPagesNumbers();




fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=1&PageNumber=1`)
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
}
return response.json(); 
})
.then(data => RenderSports(data))
.catch(error => {
console.error('There was a problem with the fetch operation:', error);
});
fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=2&PageNumber=1`)
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
}
return response.json(); 
})
.then(data => RenderTechnologey(data))
.catch(error => {
console.error('There was a problem with the fetch operation:', error);
});



fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=3&PageNumber=1`)
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
}
return response.json(); 
})
.then(data => RenderFashion(data))
.catch(error => {
console.error('There was a problem with the fetch operation:', error);
});



fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=4&PageNumber=1`)
.then(response => {
if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
}
return response.json(); 
})
.then(data => RenderLifeStyle(data))
.catch(error => {
console.error('There was a problem with the fetch operation:', error);
});



const RenderSports=(Data)=>{

 SportContent='';
 Data.forEach(item => {
SportContent+=` <div class="row g-4 align-items-center" style="margin: 5px 0px;">
                                                        <div class="col-5">
                                                            <div class="overflow-hidden rounded">
                                                                <img loading="lazy" style="height: 100px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${item[4]}" class="img-zoomin img-fluid rounded w-100" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="features-content d-flex flex-column">
                                                                <p class="text-uppercase mb-2">Sports</p>
                                                                <a href="detail-page.html?id=${item[0]}" class="h6">${item[1]}</a>
                                                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(item[3])}</small>
                                                            </div>
                                                        </div>
                                                    </div>
`;

BodySport.innerHTML=SportContent;
});
};

const RenderTechnologey=(Data)=>{

    TechnologContent='';
    Data.forEach(item => {
        TechnologContent+=`<div class="row g-4 align-items-center"  style="margin: 5px 0px;">
                                                        <div class="col-5">
                                                            <div class="overflow-hidden rounded">
                                                                <img loading="lazy" style="height: 100px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${item[4]}" class="img-zoomin img-fluid rounded w-100" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="features-content d-flex flex-column">
                                                                <p class="text-uppercase mb-2">Technologey</p>
                                                                <a href="detail-page.html?id=${item[0]}" class="h6">${item[1]}</a>
                                                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(item[3])}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                `;

BodyTechnologe.innerHTML=TechnologContent;
});
};

   const RenderFashion=(Data)=>{

    FashionContent='';
    Data.forEach(item => {
        FashionContent+=`<div class="row g-4 align-items-center"  style="margin: 5px 0px;">
                                                        <div class="col-5">
                                                            <div class="overflow-hidden rounded">
                                                                <img loading="lazy" style="height: 100px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${item[4]}" class="img-zoomin img-fluid rounded w-100" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="features-content d-flex flex-column">
                                                                <p class="text-uppercase mb-2">Fashion</p>
                                                                <a href="detail-page.html?id=${item[0]}" class="h6">${item[1]}</a>
                                                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(item[3])}</small>
                                                            </div>
                                                        </div>
                                                    </div>
   `;
   
   BodyFashion.innerHTML=FashionContent;
   });
   };

   const RenderLifeStyle=(Data)=>{

    LifeStyleContent='';
    Data.forEach(item => {
        LifeStyleContent+=`<div class="row g-4 align-items-center"  style="margin: 5px 0px;">
                                                        <div class="col-5">
                                                            <div class="overflow-hidden rounded">
                                                                <img loading="lazy" style="height: 100px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${item[4]}" class="img-zoomin img-fluid rounded w-100" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="features-content d-flex flex-column">
                                                                <p class="text-uppercase mb-2">Life Style</p>
                                                                <a href="detail-page.html?id=${item[0]}" class="h6">${item[1]}</a>
                                                                <small class="text-body d-block"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(item[3])}</small>
                                                            </div>
                                                        </div>
                                                    </div>
   `;
   
   BodyLifeStyle.innerHTML=LifeStyleContent;
   });
   };
   


document.getElementById('N1').addEventListener('click',function(){
    BodySport.innerHTML='';
    if(SportPageNumberCount>SportPagesNumber){
    return;
    }
    SportPageNumberCount=SportPageNumberCount+1;
    if(SportPageNumberCount>SportPagesNumber){
    return;
    }
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=1&PageNumber=${SportPageNumberCount}`)
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
    })
    .then(data => RenderSports(data))
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });

});


document.getElementById('P1').addEventListener('click',function(){

    SportPageNumberCount=SportPageNumberCount-1;
    if(SportPageNumberCount==0){
        SportPageNumberCount=SportPageNumberCount+1;
    }
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=1&PageNumber=${SportPageNumberCount}`)
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
    })
    .then(data => RenderSports(data))
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
    

});


document.getElementById('N2').addEventListener('click',function(){
    BodyTechnologe.innerHTML='';
    if(TechnologPageNumberCount>TechnologPagesNumber){
    return;
    }
    TechnologPageNumberCount=TechnologPageNumberCount+1;
    if(TechnologPageNumberCount>TechnologPagesNumber){
    return;
    }
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=2&PageNumber=${TechnologPageNumberCount}`)
    .then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
    })
    .then(data => RenderTechnologeys(data))
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
    
    });
    
    
    document.getElementById('P2').addEventListener('click',function(){
    
        TechnologPageNumberCount=TechnologPageNumberCount-1;
        if(TechnologPageNumberCount==0){
            TechnologPageNumberCount=TechnologPageNumberCount+1;
        }
        
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=2&PageNumber=${TechnologPageNumberCount}`)
        .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
        })
        .then(data => RenderTechnologey(data))
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
        
    
    });




    document.getElementById('N3').addEventListener('click',function(){
        BodyFashion.innerHTML='';
        if(FashionPageNumberCount>FashionPagesNumber){
        return;
        }
        FashionPageNumberCount=FashionPageNumberCount+1;
        if(FashionPageNumberCount>FashionPagesNumber){
        return;
        }
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=3&PageNumber=${FashionPageNumberCount}`)
        .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
        })
        .then(data => RenderFashion(data))
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
        
        });
            

        document.getElementById('P3').addEventListener('click',function(){
        
            FashionPageNumberCount=FashionPageNumberCount-1;
        if(FashionPageNumberCount==0){
            FashionPageNumberCount=FashionPageNumberCount+1;
        }
        
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=3&PageNumber=${FashionPageNumberCount}`)
        .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
        })
        .then(data => RenderFashion(data))
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
        
        });



        document.getElementById('N4').addEventListener('click',function(){
            BodyLifeStyle.innerHTML='';
            if(LifeStylePageNumberCount>LifeStylePagesNumber){
            return;
            }
            LifeStylePageNumberCount=LifeStylePageNumberCount+1;
            if(LifeStylePageNumberCount>LifeStylePagesNumber){
            return;
            }
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=4&PageNumber=${LifeStylePageNumberCount}`)
            .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
            })
            .then(data => RenderLifeStyle(data))
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            });
            
            });
            
            
            document.getElementById('P4').addEventListener('click',function(){
            
                LifeStylePageNumberCount=LifeStylePageNumberCount-1;
            if(LifeStylePageNumberCount==0){
                LifeStylePageNumberCount=LifeStylePageNumberCount+1;
            }
            
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/NewsDependOnGategores?GategoreID=4&PageNumber=${LifeStylePageNumberCount}`)
            .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
            })
            .then(data => RenderLifeStyle(data))
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            });
            
            });



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


            document.querySelector('.SubscribeFormM').addEventListener('submit',function(event){
          
                event.preventDefault();
                let Email = document.getElementById('emailM').value;
                
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
            
            