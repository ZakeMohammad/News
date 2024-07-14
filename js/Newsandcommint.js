let token = localStorage.getItem('Token');
if(token==null){
 window.location.href='index.html';
}
   

function parseJwt(token) {
    try {
        if (!token || typeof token !== 'string') {
            throw new Error('Invalid token format.');
        }

        // Split the token into parts
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token structure.');
        }

        // Decode the Base64Url string
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Parse the JSON payload
        const parsedPayload = JSON.parse(decodedPayload);

        return parsedPayload;
    } catch (error) {
        console.error('Failed to decode token:', error.message);
        return null;
    }
}

let decodedToken = parseJwt(token);


let image = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"];
    let email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    let AdminIDtoken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
    let Name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    let PersonID=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber"]

    console.log(PersonID);

document.getElementById('AdminImage').src =` https://zakimohammad2-001-site1.etempurl.com/Images/AdminsImages/${image}`;
document.getElementById('Name').innerText =`${Name}`;
document.getElementById('UpdateMyProfileLink').href=`UpdateAdmin.html?id=${AdminIDtoken}`;


document.getElementById('myBtn').addEventListener('click',function(){
    let Contacts= document.getElementById('modal-content');
    let Contactselements='';
 
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/GetContacts?Role=2`)
    .then(response =>{
     return response.json();
    }).then(data=>{
     data.forEach(item=>{
         Contactselements+=`   
                   <div class="chip">
                     <img src=" https://zakimohammad2-001-site1.etempurl.com/Images/Puplishers/${item[2]}" alt="" width="96" height="96">
                     <a href="Messages.html?PuplisherID=${item[0]}&AdminID=${AdminIDtoken}&IsAdmin=true">${item[1]}</a>  
                      <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
                   </div>
         `;
 
     })
 
     Contacts.innerHTML+=Contactselements;
    });
 
 });
 


document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/News/News.html') {

        let TabelNews=document.querySelector('.NewsTabel tbody');
        let TabelTranding=document.querySelector('.Tranding tbody');
        let NewsContent='';
        let TrandingContent='';
        let NewsPageNumberCount=1;
        let TrandingPageNumberCount=1;
        let NewsPagesNumber=1;
        let TrandingPagesNumber=1;


     
        const FillPagesNumbers= ()=>{
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=6&PuplisherID=0&GategoreID=0&NewsID=0`)
            .then(response=>{
                return response.json(); 
            }).then(data=> NewsPagesNumber=data);

            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=8&PuplisherID=0&GategoreID=0&NewsID=0`)
            .then(response=>{
                return response.json(); 
            }).then(data=> TrandingPagesNumber=data);

          console.log(NewsPagesNumber+' NNNN')
          console.log(TrandingPagesNumber+' SSS')
        }

        FillPagesNumbers();


        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=0`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => RenderNews(data))
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=0`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => RenderTranding(data))
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

      
const RenderNews=(TabelData)=>{
  
  
    NewsContent='';
    TabelData.forEach(item => {
    
        NewsContent+=`  <tr>
                                            <th scope="row">${item.id}</th>
                                            <td>${item.titel}</td>
                                            <td>${item.date}</td>
                                            <td>${item.views}</td>
                                            <td>${item.commints}</td>
                                            <td>${item.gategoreName}</td>
                                            <td>${item.puplisherName}</td>
                                            <td>
                                                <a data-id="${item.id}" class="btnUnCommintNews btn btn-primary">  <i class="fas fa-comment-slash"></i></a>
                                                <a data-id="${item.id}" class="btnDeleteNews btn btn-danger"><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
        `;

        TabelNews.innerHTML=NewsContent;
    });

    document.querySelectorAll('.btnDeleteNews').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer'));
            document.getElementById('confirmDeleteNews').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });


   
   
    document.querySelectorAll('.btnUnCommintNews').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer2'));
            document.getElementById('confirmChangeNews').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });
}


const RenderTranding=(TabelData)=>{
  
    TrandingContent='';
    TabelData.forEach(item => {
        let Status='';
console.log(item);
        if(item.isActive==1){
            Status="Active";
        }
        else{
            Status="Not Active";
        }
          
 

        TrandingContent+=` <tr>
                                             <tr>
                                            <th scope="row">${item.id}</th>
                                            <td><img loading="lazy"  src=" https://zakimohammad2-001-site1.etempurl.com/Images/Tranding/${item.image}" alt="Not Loaded" style="width: 60px; height: 60px; border-radius: 50%;"></td>
                                            <td>${item.detils} </td>
                                             <td>${Status} </td>
                                            <td>
                                              <a data-id="${item.id}" class="btn btn-secondary btnChangeStatusTranding"><i class="fas fa-bell-slash"></i></a>
                                                <a data-id="${item.id}" class="btnDeleteTrandingNews btn btn-danger"><i class="fas fa-trash"></i></a>
                                            </td>
                             </tr>
        `;
        TabelTranding.innerHTML=TrandingContent;
    });



    document.querySelectorAll('.btnDeleteTrandingNews').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer3'));
            document.getElementById('confirmDeleteTrandingNews').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });
    

    
    document.querySelectorAll('.btnChangeStatusTranding').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer4'));
            document.getElementById('confirmChangeTranding').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });
}


function closeMessage(el) {
    el.classList.add('is-hidden');
  }
  
  
  function openMessage(el) {
        el.classList.remove('is-hidden');
  
        if (!el.classList.contains('Message--red')) 
        {
        clearTimeout(timerId);
        timerId = setTimeout(function() {
       closeMessage(el);
        }, 5000);
      }
  }
  


timerId = setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);


  document.querySelectorAll('.js-messageClose').forEach(function(button) {
    button.addEventListener('click', function(e) {
      closeMessage(this.closest('.Message'));
      clearTimeout(timerId);
    });
  });



  document.getElementById('confirmDeleteNews').addEventListener('click',function(){
   
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/${this.getAttribute('data-id')}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
});

document.getElementById('confirmChangeNews').addEventListener('click', function(e) {
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/UncommintNews${this.getAttribute('data-id')}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
          
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
  });


  document.getElementById('confirmDeleteTrandingNews').addEventListener('click',function(){
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/Tranding${this.getAttribute('data-id')}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
});

document.getElementById('confirmChangeTranding').addEventListener('click', function(e) {
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/MakeTranding${this.getAttribute('data-id')}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
          
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
  });



document.getElementById('NextNews').addEventListener('click',function(){
    TabelNews.innerHTML='';
    if(NewsPageNumberCount>NewsPagesNumber){
    return;
 }
 NewsPageNumberCount=NewsPageNumberCount+1;
     if(NewsPageNumberCount>NewsPagesNumber){
         return;
     }
 fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=0`)
 .then(response => {
     if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
     }
     return response.json(); 
 })
 .then(data => RenderNews(data))
 .catch(error => {
     console.error('There was a problem with the fetch operation:', error);
 });
 
  })
 
 
 document.getElementById('PervisNews').addEventListener('click',function(){
   
    NewsPageNumberCount=NewsPageNumberCount-1;
     if(NewsPageNumberCount==0){
        NewsPageNumberCount=NewsPageNumberCount+1;
     }
 
     fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=0`)
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok ' + response.statusText);
         }
         return response.json(); 
     })
     .then(data => RenderNews(data))
     .catch(error => {
         console.error('There was a problem with the fetch operation:', error);
     });
     
 })
 
 document.getElementById('NextTranding').addEventListener('click',function(){
     TabelTranding.innerHTML='';
     console.log(TrandingPagesNumber);
     if(TrandingPageNumberCount>TrandingPagesNumber){
         return;
     }
     TrandingPageNumberCount=TrandingPageNumberCount+1;
     if(TrandingPageNumberCount>TrandingPagesNumber){
         return;
     }
 fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=0`)
 .then(response => {
     if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
     }
     return response.json(); 
 })
 .then(data => RenderTranding(data))
 .catch(error => {
     console.error('There was a problem with the fetch operation:', error);
 });
 
 })
 
 document.getElementById('PervisTranding').addEventListener('click',function(){
    
    TrandingPageNumberCount=TrandingPageNumberCount-1;
     if(TrandingPageNumberCount==0){
        TrandingPageNumberCount=TrandingPageNumberCount+1;
     }
 fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=0`)
 .then(response => {
     if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
     }
     return response.json(); 
 })
 .then(data => RenderTranding(data))
 .catch(error => {
     console.error('There was a problem with the fetch operation:', error);
 });
 
 })
 
    }



    if(window.location.pathname==='/News/Commints.html'){


    let TabelCommints=document.querySelector('.accordion-flush');
    let TabelSubscripers=document.getElementById('accordionExample');
    let TabelAdds=document.querySelector('.table tbody');
    let CommintsContent='';
    let AddsCountent='';
    let SubscContent='';
    let COmmintsPageNumberCount=1;
    let SubsPageNumberCount=1;
    let CommintPagesNumber=1;
    let SubsPagesNumber=1;

    function closeMessage(el) {
        el.classList.add('is-hidden');
      }
      
      
      function openMessage(el) {
            el.classList.remove('is-hidden');
      
            if (!el.classList.contains('Message--red')) 
            {
            clearTimeout(timerId);
            timerId = setTimeout(function() {
           closeMessage(el);
            }, 5000);
          }
      }
      
    
    
    timerId = setTimeout(function() {
        closeMessage(document.getElementById('js-timer'));
      }, 5000);
    
    
      document.querySelectorAll('.js-messageClose').forEach(function(button) {
        button.addEventListener('click', function(e) {
          closeMessage(this.closest('.Message'));
          clearTimeout(timerId);
        });
      });
    

   
    const FillPagesNumbers= ()=>{
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=3&PuplisherID=0&GategoreID=0&NewsID=0&NewsID=0`)
        .then(response=>{
            return response.json(); 
        }).then(data=> CommintPagesNumber=data);
       
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=4&PuplisherID=0&GategoreID=0&NewsID=0`)
        .then(response=>{
            return response.json(); 
        }).then(data=> SubsPagesNumber=data);
    }

    FillPagesNumbers();


    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint?Pagenumber=${COmmintsPageNumberCount}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => RenderCommint(data))
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Subscriber/PageNumber?PageNumber=${SubsPageNumberCount}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }  
        return response.json(); 
    })
    .then(data => RenderSubs(data))
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
       
    });


    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Adds/PageNumber1`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }  
        return response.json(); 
    })
    .then(data => RenderAdds(data))
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
       
    });



    const RenderCommint=(TabelData)=>{
        let Counter=0;
  
        CommintsContent='';
        TabelData.forEach(item => {
        
        Counter++;
        let ID='';
        let Collaps='';
        if(Counter==1){
            ID='headingOne';
            Collaps='collapseOne';
        }
        else if(Counter==2){
            ID='headingTwo';
            Collaps='collapseTwo';
        }
        else if (Counter==3){
            ID='headingThree';
            Collaps='collapseThree';
        }

            CommintsContent+=`
             <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-${ID}">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-${Collaps}"
                                                aria-expanded="true" aria-controls="flush-${Collaps}">
                                              News ID: ${item.newsID} <br>
                                              From: ${item.name} 
                                            </button>
                                        </h2>
                                        <div id="flush-${Collaps}" class="accordion-collapse collapse show"
                                            aria-labelledby="flush-${ID}" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                ${item.detils}
                                               <a  class="btn btn-danger btnDeleteCommint"  data-id="${item.id}" ><i class="fas fa-trash"></i></a>
                                            </div>
                                        </div>
                                    </div>
            `;
    
            TabelCommints.innerHTML=CommintsContent;
        });

        document.querySelectorAll('.btnDeleteCommint').forEach(a => {
            a.addEventListener('click', function(event) {
                event.preventDefault();
                openMessage(document.getElementById('js-NotTimer2'));
                document.getElementById('confirmDeleteCommint').setAttribute('data-id', this.getAttribute('data-id'));
            });
        });
    }
    
    
    const RenderSubs=(TabelData)=>{
        let Counter2=0;
  
        SubscContent='';
        TabelData.forEach(item => {
     
            Counter2++;
            let ID2='';
            let Collaps2='';
            if(Counter2==1){
                ID2='headingOne';
                Collaps2='collapseOne';
            }
            else if(Counter2==2){
                ID2='headingTwo';
                Collaps2='collapseTwo';
            }
            else if (Counter2==3){
                ID2='headingThree';
                Collaps2='collapseThree';
            }
            SubscContent+=`  <div class="accordion-item">
                                        <h2 class="accordion-header" id="${ID2}">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#${Collaps2}"
                                                aria-expanded="false" aria-controls="${Collaps2}">
                                              ${item.email} 
                                            </button>
                                        </h2>
                                        <div id="${Collaps2}" class="accordion-collapse collapse show"
                                            aria-labelledby="${ID2}" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                           ${item.dateofSubscribe}
                                                
                                               <a  class="btn btn-info btnSendMessage"  data-id="${item.id}" > <i class="fas fa-envelope"></i></a>
                                               <a  class="btn btn-danger btnDeleteSubs"  data-id="${item.id}" ><i class="fas fa-trash"></i></a>
                                            </div>
                                        </div>
                                    </div>
            `;

            TabelSubscripers.innerHTML=SubscContent;
        });
    
    
        document.querySelectorAll('.btnDeleteSubs').forEach(a => {
            a.addEventListener('click', function(event) {
                event.preventDefault();
                openMessage(document.getElementById('js-NotTimer'));
                document.getElementById('confirmDeleteSubscriper').setAttribute('data-id', this.getAttribute('data-id'));
            });
        });
    
    }
    


    const RenderAdds=(TabelData)=>{

        AddsCountent='';
        TabelData.forEach(item => {
            let Status='';
            if(item.isActive==1){
                Status='Active';
            }
            else if(item.isActive==0){
                Status='Not Active';
            }
            AddsCountent+=`      <tr>
                                                <th scope="row">${item.id}</th>
                                                <td><img loading="lazy" loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Adds/${item.image}" alt="" style="width: 50px; height: 50px; border-radius: 50%;"></td>
                                                <td>${item.name}</td>
                                                <td>${item.url}</td>
                                                <td>${item.date}</td>
                                             
                                                <td>${Status}</td>
                                               
                                                <td>
                                                    <a data-id="${item.id}" class="btn btn-secondary btnChangeStatusAdds" ><i class="fas fa-bell-slash"></i></a>
                                                   <a class="btn  btn-primary" href="UpdateAdds.html?id=${item.id}"><i class="far fa-edit"></i></a>
                                                </td>
                                            </tr>
            `;

            TabelAdds.innerHTML=AddsCountent;
        });
    
    
        document.querySelectorAll('.btnChangeStatusAdds').forEach(a => {
            a.addEventListener('click', function(event) {
                event.preventDefault();
                openMessage(document.getElementById('js-NotTimer3'));
                document.getElementById('confirmChangeAdds').setAttribute('data-id', this.getAttribute('data-id'));
            });
        });
    
    }
    


    document.getElementById('NextCommint').addEventListener('click',function(){
        TabelCommints.innerHTML='';
        if(COmmintsPageNumberCount>CommintPagesNumber){
        return;
     }
 
     COmmintsPageNumberCount=COmmintsPageNumberCount+1;
         if(COmmintsPageNumberCount>CommintPagesNumber){
             return;
         }
     fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint?Pagenumber=${COmmintsPageNumberCount}&NewsID=0`)
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok ' + response.statusText);
         }
         return response.json(); 
     })
     .then(data => RenderCommint(data))
     .catch(error => {
         console.error('There was a problem with the fetch operation:', error);
     });
     
      })
     
     
     document.getElementById('PervisCommint').addEventListener('click',function(){
       
        COmmintsPageNumberCount=COmmintsPageNumberCount-1;
         if(COmmintsPageNumberCount==0){
            COmmintsPageNumberCount=COmmintsPageNumberCount+1;
         }
     
         fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint?Pagenumber=${COmmintsPageNumberCount}&NewsID=0`)
         .then(response => {
             if (!response.ok) {
              
                 throw new Error('Network response was not ok ' + response.statusText);
             }
          
             return response.json(); 
         })
         .then(data => RenderCommint(data))
         .catch(error => {
             console.error('There was a problem with the fetch operation:', error);
         });
         
     })


     document.getElementById('NextSubs').addEventListener('click',function(){
        TabelSubscripers.innerHTML='';
        if(SubsPageNumberCount>SubsPagesNumber){
        return;
     }
     SubsPageNumberCount=SubsPageNumberCount+1;
         if(SubsPageNumberCount>SubsPagesNumber){
             return;
         }
     fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Subscriber/PageNumber?PageNumber=${SubsPageNumberCount}`)
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok ' + response.statusText);
         }
         return response.json(); 
     })
     .then(data => RenderSubs(data))
     .catch(error => {
         console.error('There was a problem with the fetch operation:', error);
     });
     
      })
     
     
     document.getElementById('PervisSubs').addEventListener('click',function(){
       
        SubsPageNumberCount=SubsPageNumberCount-1;
         if(SubsPageNumberCount==0){
            SubsPageNumberCount=SubsPageNumberCount+1;
         }
     
         fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Subscriber/PageNumber?PageNumber=${SubsPageNumberCount}`)
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok ' + response.statusText);
             }
             return response.json(); 
         })
         .then(data => RenderSubs(data))
         .catch(error => {
             console.error('There was a problem with the fetch operation:', error);
         });
         
     })




document.getElementById('confirmDeleteCommint').addEventListener('click',function(){
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Commint/${this.getAttribute('data-id')}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
});

document.getElementById('confirmDeleteSubscriper').addEventListener('click', function(e) {
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Subscriber/${this.getAttribute('data-id')}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
  });

  document.getElementById('confirmChangeAdds').addEventListener('click', function(e) {
   
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Adds/ChangeStatus?id=${this.getAttribute('data-id')}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response=> {
        if(!response.ok){
           
            window.location.href = 'Error.html?id=1';
            return;
        }
        closeMessage(this.closest('.Message'));
        openMessage(document.getElementById('js-timer'));;
        setTimeout(function() {
    closeMessage(document.getElementById('js-timer'));
  }, 5000);
    })
  });



    }

  if(window.location.pathname==='/News/UpdateAdds.html'){
  
    const AddID = new URLSearchParams(window.location.search).get('id');


    function closeMessage(el) {
        el.classList.add('is-hidden');
      }
      
      
      function openMessage(el) {
            el.classList.remove('is-hidden');
      
            if (!el.classList.contains('Message--red')) 
            {
            clearTimeout(timerId);
            timerId = setTimeout(function() {
           closeMessage(el);
            }, 5000);
          }
      }
      
    
    
    timerId = setTimeout(function() {
        closeMessage(document.getElementById('js-timer'));
      }, 5000);
    
    
      document.querySelectorAll('.js-messageClose').forEach(function(button) {
        button.addEventListener('click', function(e) {
          closeMessage(this.closest('.Message'));
          clearTimeout(timerId);
        });
      });
    




    
  let GetAddsDetails=()=>{
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Adds/${AddID}`,{
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
      
      document.getElementById('name').value=data.name;
     document.getElementById('URL').value= data.url;
     document.getElementById('UpdateImage').src=` https://zakimohammad2-001-site1.etempurl.com/Images/Adds/${data.image}`;
     
    })
    };


    GetAddsDetails();


  
  const UpdateForm= document.querySelector('.UpdateForm');

  UpdateForm.addEventListener('submit',(event)=>{
 
 let Namee=document.getElementById('name');
 let URL=document.getElementById('URL');
 let Imagee=document.getElementById('Image');
 event.preventDefault();
 
    const formData = new FormData();
    formData.append('URL', URL.value);
    formData.append('Date',"2024-06-29T18:04:39.953Z");
    formData.append('Name',Namee.value);
    formData.append('IsActive',true);
    formData.append('Image', 'empty');
    formData.append('ID',0);
    formData.append('imageFile', Imagee.files[0]);
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Adds/${AddID}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            openMessage(document.getElementById('js-timer2'));
            setTimeout(function() {
                closeMessage(document.getElementById('js-timer2'));
            }, 5000);    
        } else {
            console.log(response)
            console.log('Failed to update Adds. Status code: ' + response.status);
            openMessage(document.getElementById('js-timer3'));
            setTimeout(function() {
                closeMessage(document.getElementById('js-timer3'));
            }, 5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    



  }
  )}


}
);

