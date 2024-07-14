

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
    let IDtoken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
    let Name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    let role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
   let PersonID=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber"]




document.getElementById('PuplisherImage').src =` https://zakimohammad2-001-site1.etempurl.com/Images/Puplishers/${image}`;
document.getElementById('Name').innerText =`${Name}`;
document.getElementById('UpdateMyProfileLink').href=`UpdatePuplisher.html?id=${IDtoken}`;

document.getElementById('myBtn').addEventListener('click',function(){
   let Contacts= document.getElementById('modal-content');
   let Contactselements='';


   fetch(`https://zakimohammad2-001-site1.etempurl.com/api/Message/GetContacts?Role=1`)
   .then(response =>{
    return response.json();
   }).then(data=>{
    data.forEach(item=>{
        Contactselements+=`   
                  <div class="chip">
                    <img src=" https://zakimohammad2-001-site1.etempurl.com/Images/AdminsImages/${item[2]}" alt="" width="96" height="96">
                    <a href="MessegesPuplishers.html?PuplisherID=${IDtoken}&AdminID=${item[0]}&IsAdmin=false">${item[1]}</a>  
                     <span class="closebtn" onclick="this.parentElement.style.display='none'">&times;</span>
                  </div>
                  `;

    })

    Contacts.innerHTML+=Contactselements;
   });
})




document.addEventListener("DOMContentLoaded", function() {

    if (window.location.pathname === '/News/IndexPuplisher.html') {

        let TabelNews=document.querySelector('.NewsTabel tbody');
        let TabelTranding=document.querySelector('.Tranding tbody');
        let NewsContent='';
        let TrandingContent='';
        let NewsPageNumberCount=1;
        let TrandingPageNumberCount=1;
        let NewsPagesNumber=1;
        let TrandingPagesNumber=1;
    
        
        const FillPagesNumbers= ()=>{
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=6&PuplisherID=${IDtoken}&GategoreID=0`)
            .then(response=>{
                return response.json(); 
            }).then(data=> NewsPagesNumber=data);
    
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=9&PuplisherID=${IDtoken}&GategoreID=0`)
            .then(response=>{
                return response.json(); 
            }).then(data=> TrandingPagesNumber=data);
    
          
        }
    
        FillPagesNumbers();
    
    
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=${IDtoken}`)
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
    
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=${IDtoken}`)
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
    
    console.log(TabelData);
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
                                                <a href="UpdateNews.html?id=${item.id}" class="btn btn-primary">  <i class="fas fa-edit"></i></a>
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
        console.log(TabelData);
    TrandingContent='';
    TabelData.forEach(item => {
        TrandingContent+=` <tr>
                                             <tr>
                                            <th scope="row">${item.id}</th>
                                            <td><img loading="lazy" loading="lazy" src=" https://zakimohammad2-001-site1.etempurl.com/Images/Tranding/${item.image}" alt="Not Loaded" style="width: 60px; height: 60px; border-radius: 50%;"></td>
                                            <td>${item.detils} </td>
                                            <td>
                                              
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
            window.location.href = 'Error.html?id=2';
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
          
            window.location.href = 'Error.html?id=2';
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
            window.location.href = 'Error.html?id=2';
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
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=${IDtoken}`)
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
    
     fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetNews?PageNumber=${NewsPageNumberCount}&PuplisherID=${IDtoken}`)
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
     if(TrandingPageNumberCount>TrandingPagesNumber){
         return;
     }
     TrandingPageNumberCount=TrandingPageNumberCount+1;
     if(TrandingPageNumberCount>TrandingPagesNumber){
         return;
     }
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=${IDtoken}`)
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
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/GetTrandingNews?PageNumber=${TrandingPageNumberCount}&PuplisherID=${IDtoken}`)
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
    

    if(window.location.pathname === '/News/UpdateNews.html') {
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
          
          
          
          document.querySelectorAll('.js-messageClose').forEach(function(button) {
            button.addEventListener('click', function(e) {
              closeMessage(this.closest('.Message'));
              clearTimeout(timerId);
            });
          });
          
          timerId = setTimeout(function() {
            closeMessage(document.getElementById('js-timer2'));
          }, 5000);
          

          const NewsID = new URLSearchParams(window.location.search).get('id');
        
          console.log(NewsID)
        
          let GetDetails=()=>{
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/${NewsID}`,{
             method:'GET',
             headers:{
                'Content-Type': 'application/json'
            }
            }).then(response=>{
                if(response.status!=200)
                {
                    window.location.href = 'Error.html?id=2';
                    return;
                }
                else
                return response.json();
            }).then(data=>{
              
            document.getElementById('Titel').value=data.titel;
              document.getElementById('Details').value=data.detalis;
              document.getElementById('MoreDetails').value=data.moreDetalis;
              document.getElementById('Description').value=data.description;
            
         
              document.getElementById('Views').value=data.views;
              document.getElementById('Commints').value=data.commints;
              document.getElementById('Share').value=data.shares;
            })
            };
        
            
              GetDetails();
            
        
              const UpdateForm= document.querySelector('.UpdateNewsForm');
              console.log(UpdateForm)

              UpdateForm.addEventListener('submit',(event)=>{
             
             let Titel=document.getElementById('Titel');
             let Details=document.getElementById('Details');
             let MoreDetails=document.getElementById('MoreDetails');
             let description=document.getElementById('Description');
             let Image1=document.getElementById('Image1');
             let Image2=document.getElementById('Image2');
             let Image3=document.getElementById('Image3');
             event.preventDefault();
             
             const formData = new FormData();
             formData.append('Titel', Titel.value);
             formData.append('Date',"2024-06-29T18:04:39.953Z");
             formData.append('Detalis', Details.value);
             formData.append('MoreDetalis', MoreDetails.value);
             formData.append('Views', 0);
             formData.append('ID', 0);
             formData.append('Shares', 0);
             formData.append('GategoreName', 'ww');
             formData.append('PuplisherName','ww');
             formData.append('Commints', 0);
             formData.append('Gategore',4);
             formData.append('PuplisherID',1);
             formData.append('AllowedCommint', true);
             formData.append('Description',description.value);
             formData.append('GategoreName', '0');
             formData.append('PuplisherName',' 0');
             formData.append('FirstImage', 'empty');
             formData.append('SecoundImage', 'empty');
             formData.append('TheredImage', 'empty');
             formData.append('imageFile', Image1.files[0]);
             formData.append('imageFile2', Image2.files[0]);
             formData.append('imageFile3', Image3.files[0]);
             console.log(formData)
             fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/Update${NewsID}`, {
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
                     console.log('Failed to update Gategore. Status code: ' + response.status);
                     openMessage(document.getElementById('js-timer3'));
                     setTimeout(function() {
                         closeMessage(document.getElementById('js-timer3'));
                     }, 5000);
                 }
             })
             .catch(error => {
                 console.error('Error:', error);
             });
             
         })

        
                }


                if(window.location.pathname==='/News/AddNews.html'){
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
                      
                      
                      
                      document.querySelectorAll('.js-messageClose').forEach(function(button) {
                        button.addEventListener('click', function(e) {
                          closeMessage(this.closest('.Message'));
                          clearTimeout(timerId);
                        });
                      });
                      
                      timerId = setTimeout(function() {
                        closeMessage(document.getElementById('js-timer2'));
                      }, 5000);
                      

                    const AddNewsForm= document.querySelector('.AddNewsForm');
                    
                    AddNewsForm.addEventListener('submit',(event)=>{
                  
                    let Titel=document.getElementById('Titel');
                    let Details=document.getElementById('Details');
                    let MoreDetails=document.getElementById('MoreDetails');
                    let description=document.getElementById('Description');
                    let Gategore= document.getElementById('categorySelect');
                    let Image1=document.getElementById('Image1');
                    let Image2=document.getElementById('Image2');
                    let Image3=document.getElementById('Image3');
                    event.preventDefault();
                    
                    const formData = new FormData();
                    formData.append('Titel', Titel.value);
                    formData.append('Date',"2024-06-29T18:04:39.953Z");
                    formData.append('Detalis', Details.value);
                    formData.append('MoreDetalis', MoreDetails.value);
                    formData.append('Views', 0);
                    formData.append('Shares', 0);
                    formData.append('GategoreName', '0');
                    formData.append('PuplisherName',' 0');
                    formData.append('Commints', 0);
                    formData.append('Commints', 0);
                    formData.append('Gategore',Gategore.value);
                    formData.append('PuplisherID',IDtoken);
                    formData.append('AllowedCommint', true);
                    formData.append('Description',description.value);
                    formData.append('FirstImage', 'empty');
                    formData.append('SecoundImage', 'empty');
                    formData.append('TheredImage', 'empty');
                    formData.append('imageFile', Image1.files[0]);
                    formData.append('imageFile2', Image2.files[0]);
                    formData.append('imageFile3', Image3.files[0]);
                    console.log(formData)
                    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News`, {
                        method: 'POST',
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
                            console.log('Failed to update Gategore. Status code: ' + response.status);
                            openMessage(document.getElementById('js-timer3'));
                            setTimeout(function() {
                                closeMessage(document.getElementById('js-timer3'));
                            }, 5000);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    
                })

                }




                if (window.location.pathname === '/News/UpdatePuplisher.html') {
       
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
                      
                      
                      
                      document.querySelectorAll('.js-messageClose').forEach(function(button) {
                        button.addEventListener('click', function(e) {
                          closeMessage(this.closest('.Message'));
                          clearTimeout(timerId);
                        });
                      });
                      
                      timerId = setTimeout(function() {
                        closeMessage(document.getElementById('js-timer2'));
                      }, 5000);
                      
                      
                      
                      
                      const PuplisherID = new URLSearchParams(window.location.search).get('id');
                    
                      
                      let GetAdminDetails=()=>{
                      fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/${PuplisherID}`,{
                       method:'GET',
                       headers:{
                          'Content-Type': 'application/json'
                      }
                      }).then(response=>{
                          if(response.status!=200)
                          {
                              window.location.href = 'Error.html?id=2';
                              return;
                          }
                          else console.log(response)
                          return response.json();
                      }).then(data=>{
                        
                      document.getElementById('Email').value=data.email;
                        document.getElementById('name').value=data.name;
                        document.getElementById('imgforupdate').src+=`${data.image}`;
                       document.getElementById('btnDeleteAccount').setAttribute('data-id',data.id);
                      })
                      };

                        GetAdminDetails();

const UpdateForm= document.querySelector('.UpdateForm');
                    
UpdateForm.addEventListener('submit',(event)=>{
    let Namee=document.getElementById('name');
    let Email=document.getElementById('Email');
    let Imagee=document.getElementById('Imagee');
    event.preventDefault();
    const formData = new FormData();
    formData.append('IsApproved', true);
    formData.append('IsActive', true);
    formData.append('PersonID',0);
    formData.append('NewsNumber',0);
    formData.append('Name', Namee.value);
    formData.append('Email', Email.value);
    formData.append('Password', '234');
    formData.append('Image', 'empty');
    formData.append('Role', 1);
    formData.append('imageFile', Imagee.files[0]);
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/${PuplisherID}`, {
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
            console.log('Failed to update admin. Status code: ' + response.status);
            openMessage(document.getElementById('js-timer3'));
            setTimeout(function() {
                closeMessage(document.getElementById('js-timer3'));
            }, 5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

});

                    
                    
                    
                        document.getElementById('btnDeleteAccount').addEventListener('click', function(event) {
                            event.preventDefault();
                            openMessage(document.getElementById('js-NotTimer'));
                          
                      });
                    
                    
                      document.getElementById('confirmDeleteAdminAccount').addEventListener('click',function(){
                    
                        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/${IDtoken}`,{
                            method:'DELETE',
                            headers:{
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response=> {
                            if(!response.ok){
                               
                                window.location.href = 'Error.html?id=2';
                                return;
                            }
                            closeMessage(this.closest('.Message'));
                            openMessage(document.getElementById('js-timer'));;
                            setTimeout(function() {
                        closeMessage(document.getElementById('js-timer'));
                      }, 5000);
                      setTimeout(function() {
                       window.location='index.html'
                      }, 5000);
                    
                    
                        })
                    });
                     }  



                     
 if(window.location.pathname==='/News/AddTrandingNews.html'){
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

        
document.querySelectorAll('.js-messageClose').forEach(function(button) {
button.addEventListener('click', function(e) {
closeMessage(this.closest('.Message'));
clearTimeout(timerId);
});
});

timerId = setTimeout(function() {
closeMessage(document.getElementById('js-timer2'));
}, 5000);




const TrandingForm= document.querySelector('.FormAddTranding');
        
TrandingForm.addEventListener('submit',(event)=>{

    let Detalis=document.getElementById('Details');
    let Gategore=document.getElementById('categorySelect');
    let Imagee=document.getElementById('Imagee');
    event.preventDefault();
    const formData = new FormData();
    formData.append('Detils',Detalis.value);
    formData.append('GategoreID', Gategore.value);
    formData.append('PuplihserID',IDtoken );
    formData.append('Image', 'empty');
    formData.append('GategoreName', 'e');
    formData.append('PuplisherName', 'e');
    formData.append('ID', 0);
    formData.append('imageFile', Imagee.files[0]);
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/News/AddTranding?PuplihserID=0`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            openMessage(document.getElementById('js-timer2'));
            setTimeout(function() {
                closeMessage(document.getElementById('js-timer2'));
            }, 5000);    
        } else {
            console.log('Failed to add admin. Status code: ' + response.status);
            openMessage(document.getElementById('js-timer3'));
            setTimeout(function() {
                closeMessage(document.getElementById('js-timer3'));
            }, 5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

})








 }

});


