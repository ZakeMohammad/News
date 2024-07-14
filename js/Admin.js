
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
  console.log(AdminIDtoken);

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

        if (window.location.pathname === '/News/indexAdmin.html') {

           
    const tableBodySocialmedia = document.querySelector('#SocialMediaTabel tbody');
    const tableBodyGategore = document.querySelector('#GateogresTabel tbody');
    let GateogreContant='';
    let SOcialMediaContant='';

    fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Admin/Summary')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(dataArray => {
          
            const data = dataArray[0];
            RenderTotals(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


        fetch(' https://zakimohammad2-001-site1.etempurl.com/api/News/MostViews')
        .then(response => {
            return response.json(); 
        })
        .then(data => {
          console.log(data);
            RenderGateogres(data);
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


        fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Admin/SocialMedia')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => {
           
            RenderSocialMedia(data);
           console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

     

const RenderTotals=(data)=>{
    document.getElementById('TotalViews').textContent = data.totalViews;
    document.getElementById('TotalNews').textContent = data.totalNews;
    document.getElementById('TotalSubscripers').textContent = data.totalSubscribers;
    document.getElementById('TotalVisits').textContent = data.totalVisists;
    document.getElementById('SportRate').textContent = `${(data.sprotViewsRatio * 100)}%`;
    document.getElementById('TechRate').textContent = `${(data.technologeViewsRatio * 100)}%`;
    document.getElementById('FashoiRate').textContent = `${(data.fashionViewsRatio * 100)}%`;
    document.getElementById('LifStyleRate').textContent = data.lifeStyleViewsRatio;`${(data.lifeStyleViewsRatio * 100)}%`;
    document.getElementById('LifStyleRate').textContent = `${(data.lifeStyleViewsRatio * 100)}%`;
}


 const RenderSocialMedia=(TabelData)=>{
            
            TabelData.forEach(item => {
                let Icon='';
                if(item.id==1){
                    Icon='fa-facebook-f';
                }
                else if(item.id==2){
                    Icon='fa-twitter';
                }
                else if(item.id==3){
                    Icon='fa-instagram';
                }
                else if(item.id==4){
                    Icon='fa-youtube';
                }
                
                else if(item.id==5){
                    Icon='fa-linkedin-in';
                }
                else if(item.id==6){
                    Icon='fa-skype';
                }
                else if(item.id==7){
                    Icon='fa-pinterest-p';
                }
                

                SOcialMediaContant+=
                `
                <tr>
                <td>${item.id}</td>
                <td style="font-size: 30px; text-align: center; margin-bottom: 0px;"><i class="fab ${Icon} text-body link-hover"></i></td>
                 <td style="text-align: center;"><a href="${item.url}" target="_blanck" style="color:black">${item.url}</a></td>
                <td><a href="UpdateSocialmedia.html?id=${item.id}" class="btn btn-sm btn-primary"><i class="far fa-edit"></i></a></td>
                </tr>

                `;
               
                tableBodySocialmedia.innerHTML=SOcialMediaContant;
            });

        }

const RenderGateogres=(TabelData)=>{
  
    TabelData.forEach(item => {
        let Color='';
        if(item[0]==1){
            Color='btn-info';
        }
        else if(item[0]==2){
            Color='btn-dark';
        }
        else if(item[0]==3){
            Color='btn-danger';
        }
        else if(item[0]==4){
            Color='btn-warning';
        }
        GateogreContant+=`
<tr>
<td>${item[0]}</td>
<td><p class="btn  ${Color}">${item[1]}</p></td>
<td>${item[3]}</td>
<td style="font-weight: bolder; color: black;">${item[4]}</td>
<td><a class="btn btn-sm btn-primary" href="UpdateGategore.html?id=${item[0]}"><i class="far fa-edit"></i></a></td>
</tr>
        `;

        tableBodyGategore.innerHTML=GateogreContant;
    });
}

        }
    });
    

    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.pathname === '/UpdateGategore.html') {

  let ID = new URLSearchParams(window.location.search).get('id');


  let GetDetails=()=>{
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/GetGategore${ID}`,{
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

         console.log(data);
      document.getElementById('Titel').value=data.detalis;
      
      document.getElementById('ImageUpdate').src=` https://zakimohammad2-001-site1.etempurl.com/Images/Gategores/${data.image}`;
      
    })
    };
    
    
      GetDetails();

      const UpdateForm= document.querySelector('.GategoreUpdateForm');

      UpdateForm.addEventListener('submit',(event)=>{

     let Titel=document.getElementById('Titel');
    let Imagee=document.getElementById('Imagee');
    event.preventDefault();
    const formData = new FormData();
    formData.append('Detalis', Titel.value);
    formData.append('LastNewsDate',"2024-06-29T18:04:39.953Z");
    formData.append('Name','f');
    formData.append('NumberOfNews',0);
    formData.append('Image', 'empty');
    formData.append('ID',ID);
    if (Imagee.files.length > 0) {
        formData.append('imageFile', Imagee.files[0]);
    } else {
        formData.append('imageFile', 'empty');
    }

    console.log(Imagee.files[0]);
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/UpdateGategore${ID}`, {
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
    
    
      });

        }
    });


    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.pathname === '/UpdateSocialmedia.html') {
  
  let ID = new URLSearchParams(window.location.search).get('id');

  let GetDetails=()=>{
    fetch(`  https://zakimohammad2-001-site1.etempurl.com/api/Content/GetSocial${ID}`,{
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
      document.getElementById('URL').value=data.url;
    })
    };
    
    
      GetDetails();

      const UpdateForm= document.querySelector('.UpdateFormSocial');

      UpdateForm.addEventListener('submit',(event)=>{
     
     let URL=document.getElementById('URL');

    
     event.preventDefault();
     
     fetch(`  https://zakimohammad2-001-site1.etempurl.com/api/Content/UpdateSocialMedia${ID}`,{
     method:'PUT',
     headers:{
         'Content-Type': 'application/json'
     },

     body: JSON.stringify({
        url:URL.value,
        socialmediaName:'',
         id: 0,
       
     })
     }).then(response =>{
         if (response.status === 200) {
           
             openMessage(document.getElementById('js-timer2'));;
             setTimeout(function() {
         closeMessage(document.getElementById('js-timer2'));
       }, 5000);
       setTimeout(function() {
      window.location='indexAdmin.html'
      }, 7000);

             return response.json();
         } else {
           
         }
     })
     .catch(error => {console.log(error)
     });
     });
     


        }
    });


    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.pathname === '/AddAdmin.html') {
         
  
            const AddAdminForm= document.querySelector('.AddAdminForm');

            AddAdminForm.addEventListener('submit',(event)=>{
          
            let Namee=document.getElementById('name');
            let Email=document.getElementById('Email');
            let Password=document.getElementById('Password');
            let Permission=document.getElementById('Permission');
            let Imagee=document.getElementById('Imagee');
            event.preventDefault();
            const formData = new FormData();
            formData.append('Permissions', Permission.value === 'true');
            formData.append('IsActive', true);
            formData.append('PersonID', 1);
            formData.append('Name', Namee.value);
            formData.append('Email', Email.value);
            formData.append('Password', Password.value);
            formData.append('Image', 'empty');
            formData.append('Role', 1);
            formData.append('imageFile', Imagee.files[0]);
            
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin?ID=1`, {
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
            
            
            
        })}
    });



    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.pathname === '/UpdateAdmin.html') {
       
  
            document.getElementById('btnDeleteAdminAccount').addEventListener('click', function(event) {
                event.preventDefault();
                openMessage(document.getElementById('js-NotTimer'));
              
            });
            
  
  const AdminID = new URLSearchParams(window.location.search).get('id');

  
  let GetAdminDetails=()=>{
  fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin/${AdminID}`,{
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
    console.log(data);
    document.getElementById('imgforupdate').src+=`${data.image}`;
  document.getElementById('Email').value=data.email;
    document.getElementById('name').value=data.name;
   document.getElementById('Permission').value= data.permissions? 'true' : 'false';
   document.getElementById('btnDeleteAdminAccount').setAttribute('data-id',data.id);
  })
  };
  
  
    GetAdminDetails();
  
  
  
   const UpdateForm= document.querySelector('.UpdateAdminForm');

   UpdateForm.addEventListener('submit',(event)=>{
    let Namee=document.getElementById('name');
    let Email=document.getElementById('Email');
    
    let Permission=document.getElementById('Permission');
    let Imagee=document.getElementById('Imagee');
    event.preventDefault();
    const formData = new FormData();
    formData.append('Permissions', Permission.value === 'true');
    formData.append('IsActive', true);
    formData.append('PersonID',0);
    formData.append('Name', Namee.value);
    formData.append('Email', Email.value);
    formData.append('Password', '234');
    formData.append('Image', 'empty');
    formData.append('Role', 1);
    formData.append('imageFile', Imagee.files[0]);
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin/${AdminID}`, {
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
    
 } );


  document.getElementById('confirmDeleteAdminAccount').addEventListener('click',function(){

    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin/${AdminID}`,{
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
  setTimeout(function() {
   window.location='index.html'
  }, 5000);


    })
});



 } 
 
 
});



    document.addEventListener("DOMContentLoaded", function() {
        if (window.location.pathname === '/Admins.html') {
            let TabelAdmins=document.querySelector('.AdminsTabel tbody');
            let TabelPuplishers=document.querySelector('.PuplishersTabel tbody');
            let AdminsContent='';
            let PuplishersContent='';
            let AdminPageNumberCount=1;
            let PuplishersPageNumberCount=1;
            let AdminPagesNumber=1;
            let PuplisherPagesNumber=1;

            

            const FillPagesNumbers= ()=>{
                fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=1&PuplisherID=0&GategoreID=0&NewsID=0`)
                .then(response=>{
                    return response.json(); 
                }).then(data=> AdminPagesNumber=data);

                fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Content/PagesNumber?Tabel=2&PuplisherID=0&GategoreID=0&NewsID=0`)
                .then(response=>{
                    return response.json(); 
                }).then(data=> PuplisherPagesNumber=data);
            }


            FillPagesNumbers();



fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin?PageNumber=${AdminPageNumberCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => RenderAdmins(data))
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher?PageNumber=${PuplishersPageNumberCount}`)
        .then(response => {
            if (!response.ok) {
              
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => RenderPuplishers(data))
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

      
const RenderAdmins=(TabelData)=>{
  
  
    AdminsContent='';
    TabelData.forEach(item => {
        let Status='';
        let permi='';
        if(item.isActive==1){
            Status='Active';
        }
        else if(item.isActive==0){
            Status='Not Active';
        }

        if(item.permissions==true){
            permi='All Permissions';
        }
        else if(item.permissions==false){
            permi='Just read';
        }

    
        AdminsContent+=`<tr>
                                            <th scope="row">${item.id}</th>
                                            <td>${item.name}</td>
                                            <td>${item.email}</td>
                                           
                                            <td>${permi}</td>                                      
                                            <td>${Status}</td>
                                            <td>
                                                <a href="UpdateAdmin.html?id=${item.id}" class="btn btn-info"><i class="fas fa-edit"></i></a>
                                                <a data-id="${item.id}" class="btnChangeStatusAdmin btn btn-secondary"><i class="fas fa-bell-slash"></i></a>
                                                <a  class=" btn btn-danger btnDeleteAdmin"  data-id="${item.id}" ><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
        `;

        TabelAdmins.innerHTML=AdminsContent;
    });

    document.querySelectorAll('.btnDeleteAdmin').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            const adminId = this.getAttribute('data-id');
         
            openMessage(document.getElementById('js-NotTimer'));
            document.getElementById('confirmDeleteAdmin').setAttribute('data-id', adminId);
        });
    });


   
   
    document.querySelectorAll('.btnChangeStatusAdmin').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer2'));
            document.getElementById('confirmChangeAdmin').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });
}


const RenderPuplishers=(TabelData)=>{
    
    PuplishersContent='';
    TabelData.forEach(item => {
        let Status='';
        let Provid='isApproved';
        if(item.isApproved==1){
            Provid='Provid';
        }
        else{
            Provid='Not Provide';
        }
       
        if(item.isActive==1){
            Status='Active';
        }
        else if(item.isActive==0){
            Status='Not Active';
        }
        PuplishersContent+=` <tr>
                                            <th scope="row">${item.id}</th>
                                            <td>${item.name}</td>
                                            <td>${item.email}</td>
                                            <td>${item.newsNumber}</td>
                                            <td>${Provid}</td>
                                            <td>${Status}</td>
                                            <td>
                                                <a data-id="${item.id}" id="Prov" class="btn btn-warning btnProvidePuplisher"><i class="fas fa-vote-yea"></i></a>
                                                <a data-id="${item.id}" class="btn btn-secondary btnChangeStatusPuplisher"><i class="fas fa-bell-slash"></i></a>
                                                <a data-id="${item.id}" class="btn btn-danger btnDeletePuplisher"><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
        `;
        TabelPuplishers.innerHTML=PuplishersContent;
    });


    document.querySelectorAll('.btnDeletePuplisher').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            const PuplisherID = this.getAttribute('data-id');
            openMessage(document.getElementById('js-NotTimer4'));
            document.getElementById('confirmDeletePuplisher').setAttribute('data-id', PuplisherID);
        });
    });


    document.querySelectorAll('.btnChangeStatusPuplisher').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer3'));
            document.getElementById('confirmChangePuplisher').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.btnProvidePuplisher').forEach(a => {
        a.addEventListener('click', function(event) {
            event.preventDefault();
            openMessage(document.getElementById('js-NotTimer5'));
            document.getElementById('ConfirmProvide').setAttribute('data-id', this.getAttribute('data-id'));
        });
    });

}


 document.getElementById('NextAdmin').addEventListener('click',function(){
   TabelAdmins.innerHTML='';
   if(AdminPageNumberCount>AdminPagesNumber){
   return;
}
    AdminPageNumberCount=AdminPageNumberCount+1;
    if(AdminPageNumberCount>AdminPagesNumber){
        return;
    }
fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin?PageNumber=${AdminPageNumberCount}`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => RenderAdmins(data))
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

 })


document.getElementById('PervisAdmin').addEventListener('click',function(){
  
    AdminPageNumberCount=AdminPageNumberCount-1;
    if(AdminPageNumberCount==0){
        AdminPageNumberCount=AdminPageNumberCount+1;
    }

    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin?PageNumber=${AdminPageNumberCount}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => RenderAdmins(data))
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    
})

document.getElementById('NextPuplisher').addEventListener('click',function(){
    TabelPuplishers.innerHTML='';
    if(PuplishersPageNumberCount>PuplisherPagesNumber){
        return;
    }
    PuplishersPageNumberCount=PuplishersPageNumberCount+1;
    if(PuplishersPageNumberCount>PuplisherPagesNumber){
        return;
    }
fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher?PageNumber=${PuplishersPageNumberCount}`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => RenderPuplishers(data))
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

})

document.getElementById('PervisPuplisher').addEventListener('click',function(){
   
    PuplishersPageNumberCount=PuplishersPageNumberCount-1;
    if(PuplishersPageNumberCount==0){
        PuplishersPageNumberCount=PuplishersPageNumberCount+1;
    }
fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher?PageNumber=${PuplishersPageNumberCount}`)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); 
})
.then(data => RenderPuplishers(data))
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

})


document.getElementById('confirmDeleteAdmin').addEventListener('click',function(){
    const adminId = this.getAttribute('data-id');
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin/${adminId}`,{
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

document.getElementById('confirmDeletePuplisher').addEventListener('click', function(e) {
    const PuplisherID = this.getAttribute('data-id');
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/${PuplisherID}`,{
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




  document.getElementById('confirmChangeAdmin').addEventListener('click',function(){
    
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Admin/DesActive${this.getAttribute('data-id')}`,{
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

document.getElementById('confirmChangePuplisher').addEventListener('click', function(e) {
    const PuplisherID = this.getAttribute('data-id');
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/DesActive${PuplisherID}`,{
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


  document.getElementById('ConfirmProvide').addEventListener('click', function(e) {
  
    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Puplisher/Provide${this.getAttribute('data-id')}`,{
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


document.querySelectorAll('.js-messageClose').forEach(function(button) {
    button.addEventListener('click', function(e) {
      closeMessage(this.closest('.Message'));
      clearTimeout(timerId);
    });
  });
        }
    });
    


