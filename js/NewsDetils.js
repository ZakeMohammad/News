let Tranding= document.querySelector('.Tranding');

fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/Tranding')
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




let GategoresRith= document.querySelector('.GategoresRith');
fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Content/Gategoes')
.then(Response=> {
return Response.json();
 })
.then(data=>{
    RenderGategores(data);
});

 const RenderGategores=(Data)=>{
  
    GategoresRith.innerHTML='';

    Data.forEach(data=>{
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
                                                        <h6 class="mb-2">${data[3]}}</h6>
                                                        <p class="text-dark mb-2"></p>
                                                        <a target="_blank" href="${data[1]}}" class="btn btn-primary text-white px-4">Shop Now</a>
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



const NewsID = new URLSearchParams(window.location.search).get('id');

fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/IncreaseViews?ID=${NewsID}`);

let GetDetails=()=>{
    fetch(`  https://zakimohammad2-001-site1.etempurl.com/api/News/${NewsID}`,{  
method:'GET', 
headers:{
        'Content-Type': 'application/json'
    }
    }).then(response=>{
        if(response.status!=200)
        {
            window.location.href = 'Error.html?id=1';
            return;
        }
        else
        return response.json();
    }).then(data=>{
       
        RenderDetalis(data);
  
    })
    };
    
    
GetDetails();


function insertLineBreaks(text) {
    return text.split('.').join('.<br><br>');
}


const RenderDetalis=(Data)=>{

console.log(Data);

    let GategoreName='';

    if(Data.gategore==1)
        GategoreName='Sports';
    
    if(Data.gategore==2)
        GategoreName='Technologey';
    
    if(Data.gategore==3)
        GategoreName='Fashion';
    
    if(Data.gategore==4)
        GategoreName='Life Style';

    if(Data.allowedCommint==true){
        document.getElementById('btnAddCommint').disabled = false;
    }
    else{
        document.getElementById('btnAddCommint').disabled = true;
    }
  

 document.getElementById('GategoreName').textContent=GategoreName;
 document.getElementById('TitelForNews').textContent=Data.titel;
 document.getElementById('DateNews').innerHTML='<i class="fa fa-clock"></i>'+  ConvertTime(Data.date);
 document.getElementById('ViewsNews').innerHTML=`<i class="fa fa-eye"></i> ${Data.views} Views`;
 document.getElementById('CommentNews').innerHTML=`<i class="fa fa-comment-dots"></i> ${Data.commints} Comment`;
 document.getElementById('ShareNews').innerHTML=`<i class="fa fa-comment-dots"></i> ${Data.shares} Share`;
 document.getElementById('FirstDetalis').innerHTML=insertLineBreaks(Data.detalis);
 document.getElementById('Description').textContent=Data.description;

 document.getElementById('FirstImage').src=` https://zakimohammad2-001-site1.etempurl.com/Images/News/${Data.firstImage}`;
 document.getElementById('SecoundImage').src=` https://zakimohammad2-001-site1.etempurl.com/Images/News/${Data.secoundImage}`;
 document.getElementById('ThearedImage').src=` https://zakimohammad2-001-site1.etempurl.com/Images/News/${Data.theredImage}`;
 document.getElementById('MoreDetils').innerHTML=insertLineBreaks(Data.moreDetalis);

 document.getElementById('LinkForShare').textContent=`https://zakimohammad2-001-site1.etempurl.com/detail-page.html?id=${NewsID}`;

 
fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/Suggestions?GategoreID=${Data.gategore}&ExiptThisID=${NewsID}`)
.then(response=>{return response.json()})
.then(Data=>{RenderSuggstions(Data)});


fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint?Pagenumber=1&NewsID=${NewsID}`)
.then(response=>{return response.json()})
.then(Data=>{RenderCommints(Data)});

fetch(`
 https://zakimohammad2-001-site1.etempurl.com/api/Content/Tags`)
.then(response=>{return response.json()})
.then(Data=>{RenderTags(Data)});

};


const RenderSuggstions=(Data)=>{

let Content=document.getElementById('Suggstion2');
Content.innerHTML='';
Data.forEach(data=>{
    Content.innerHTML+=` 
     <div class="col-lg-6">
                                    <div class="d-flex align-items-center p-3 bg-white rounded" style="text-align:center">
                                        <img loading="lazy" style="width: 200px; height: 150px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/News/${data[3]}" class="img-fluid img-zoomin rounded" alt="">
                                        <div class="ms-3">
                                            <a href="detail-page.html?id=${data[0]}" class="h5 mb-2">${data[1]}</a>
                                            <p class="text-dark mt-3 mb-0 me-3"><i class="fa fa-clock"></i> ${ConvertTime(data[2])}</p>
                                        </div>
                                    </div>
                                </div>
    `;
})
};


const RenderCommints=(Data)=>{
    console.log(Data)
let Content=document.getElementById('Commints');
Content.innerHTML='';
Content.innerHTML+='  <h4 class="mb-4">Comments</h4>';
Data.forEach(data=>{
    Content.innerHTML+=` 
    <div class="p-4 bg-white rounded mb-0">
                                <div class="row g-4">
                                    <div class="col-3">
                                        <img loading="lazy" style="height: 100px;" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Commints/${data.image}" class="img-fluid rounded-circle w-100" alt="">
                                    </div>
                                    <div class="col-9">
                                        <div class="d-flex justify-content-between">
                                            <h5>${data.name}</h5>
                                        
                                        </div>
                                        <small class="text-body d-block mb-3"><i class="fas fa-calendar-alt me-1"></i> ${ConvertDate(data.date)}</small>
                                        <p class="mb-0">${data.detils}
                                        </p>
                                    </div>
                                </div>
                            </div>
    `;
})
};


const RenderTags=(Data)=>{

    let counter=0;
    document.getElementById(`tab-1`).innerHTML='';
    document.getElementById(`tab-2`).innerHTML='';
    document.getElementById(`tab-3`).innerHTML='';
    document.getElementById(`tab-4`).innerHTML='';
Data.forEach(data=>{

    counter++;

    document.getElementById(`tab-${counter}`).innerHTML=`
     <div class="row g-4 align-items-center">
                                        <div class="col-3">
                                            <img loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Tranding/${data[3]}" class="img-fluid w-100 rounded" alt="">
                                        </div>
                                        <div class="col-9">
                                            <h3>${data[2]}</h3>
                                            <p class="mb-0">
                                            ${data[1]}
                                            </p>
                                        </div>
                                    </div>
    `;
});
};


const AddForm= document.querySelector('.AddCommintForm');

AddForm.addEventListener('submit',(event)=>{
    console.log(AddForm);
let Name=document.getElementById('name');
let Commint=document.getElementById('commint');
let Image=document.getElementById('image');
event.preventDefault();
const formData = new FormData();
formData.append('ID', 0);
formData.append('NewsID', NewsID);
formData.append('Date', "2024-06-29T18:04:39.953Z");
formData.append('Name', Name.value);
formData.append('Detils', Commint.value);
formData.append('Image', 'empty');
formData.append('imageFile', Image.files[0]);

fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint?ID=0`, {
    method: 'POST',
    body: formData
})
.then(response => {
    if (response.status === 200) {
        alert('Commint Added Succssfilly');
    } else {
        alert('Commint does not addedd/');
    }
})
.catch(error => {
    console.error('Error:', error);
});
});


var modal = document.getElementById('id01');
document.getElementById('CopyLink').addEventListener('click',function(){
  
    document.getElementById('LinkForShare').textContent=`https://zakemohammad.github.io/News/detail-page.html?id=${NewsID}`;
    navigator.clipboard.writeText(document.getElementById('LinkForShare').textContent);

    fetch(`https://zakimohammad2-001-site1.etempurl.com/api/Content/IncreaseShare?ID=${NewsID}`);
    alert('Link copied to clipboard!');
    modal.style.display = "none";
});

document.getElementById('Closebtn').addEventListener('click',function(){
    modal.style.display = "none";
});
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






var modal = document.getElementById("myModal2");


var btn = document.getElementById("myBtn");


var span = document.getElementsByClassName("closeS")[0];


btn.onclick = function() {
  modal.style.display = "block";
}


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
            return text;
        });
    });
});

