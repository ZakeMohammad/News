
let PuplisherIDD=0;
let AdminIDD=0;
let IsAdminn=false;

function responsiveChat(element) {
    document.querySelector(element).innerHTML = `
      <form class="chat" id="ChatForm">
        <span></span>
        <div class="messages"></div>
        <input type="text" id="MessageForm" placeholder="Your message">
        <input type="submit" value="Send">
        <button type="button" class="delete-all">Delete All</button>
      </form>
    `;

    function showLatestMessage(element) {
      const messages = document.querySelector(element + ' .messages');
      messages.scrollTop = messages.scrollHeight;
    }

    showLatestMessage(element);

    const inputText = document.querySelector(element + ' input[type="text"]');
    const inputSubmit = document.querySelector(element + ' input[type="submit"]');
    const deleteAllBtn = document.querySelector(element + ' .delete-all');

    inputText.addEventListener('keypress', function(event) {
      if (event.which == 13) {
        event.preventDefault();
        inputSubmit.click();
      }
    });

    inputSubmit.addEventListener('click', function(event) {
      

      event.preventDefault();
      const message= inputText.value;


      if (message) {
        const dsdf = new Date();
        const dateString = dsdf.toISOString();
        const payload = {
            messege: message,
            adminID: AdminIDD,
            puplisherID: PuplisherIDD,
            date: dateString,
            id: 0,
            sender: IsAdminn,
            markAsDeleted: false
        };

     

        fetch(' https://zakimohammad2-001-site1.etempurl.com/api/Message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                console.log('Message sent successfully.');
            } else {
                console.log('Failed to send message. Status code:', response.status, 'Details:', response.statusText);
                return response.json().then(data => {
                    console.log('Response body:', data);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });


        const d = new Date();
        const clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const currentDate = `${(day < 10 ? "0" : "") + day}.${(month < 10 ? "0" : "") + month}.${d.getFullYear()} ${clock}`;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const myMessageDiv = document.createElement('div');
        myMessageDiv.classList.add('myMessage');

        const messageP = document.createElement('p');
        messageP.textContent = message;

        const date = document.createElement('date');
        date.textContent = currentDate;

        const deleteBtn = document.createElement('a');
        deleteBtn.classList.add('delete-message');
        deleteBtn.innerHTML ='<i class="fas fa-backspace"></i>';
        deleteBtn.addEventListener('click', function() {
          messageDiv.remove();
        });

        myMessageDiv.appendChild(messageP);
        myMessageDiv.appendChild(date);
        myMessageDiv.appendChild(deleteBtn);
        messageDiv.appendChild(myMessageDiv);

        document.querySelector(element + ' .messages').appendChild(messageDiv);

        setTimeout(function () {
          document.querySelector(element + ' > span').classList.add('spinner');
        }, 100);
        setTimeout(function () {
          document.querySelector(element + ' > span').classList.remove('spinner');
        }, 2000);

      }
      inputText.value = '';
      showLatestMessage(element);

    });

    deleteAllBtn.addEventListener('click', function() {
      document.querySelector(element + ' .messages').innerHTML = '';
    });
  }


  
  function responsiveChatPush(element, sender, origin, date, message,MessegeID) {
    
    const originClass = (origin === 'me') ? 'myMessage' : 'fromThem';

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const originDiv = document.createElement('div');
    originDiv.classList.add(originClass);

    const messageP = document.createElement('p');
    messageP.textContent = message;

    const dateEl = document.createElement('date');
    dateEl.innerHTML = `<b>${sender}</b> ${date}`;

    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('delete-message');
    deleteBtn.innerHTML = '<i class="fas fa-backspace"></i>';
  
    deleteBtn.addEventListener('click', function() {
       if(sender==1){
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/DeleteMessage?id=${MessegeID}&Sender=true`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=> { if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }})

       }
       else{
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/DeleteMessage?id=${MessegeID}&Sender=false`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=> { if(!response.ok){
            window.location.href = 'Error.html?id=1';
            return;
        }})

       }
      messageDiv.remove();
    });

    const DeleteALl= document.getElementById('DeleteAll').addEventListener('click',function(){
      const PuplisherMessages = document.querySelectorAll('.message');
      PuplisherMessages.forEach(message => message.remove());

      const MyMessages = document.querySelectorAll('.myMessage');
      MyMessages.forEach(message => message.remove());
    });

    originDiv.appendChild(messageP);
    originDiv.appendChild(dateEl);
    originDiv.appendChild(deleteBtn);
    messageDiv.appendChild(originDiv);

    console.log('here wirte');
    document.querySelector(element + ' .messages').appendChild(messageDiv);
  }


document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/MessegesPuplishers.html') {

        const urlParams = new URLSearchParams(window.location.search);
        const PuplisherID = urlParams.get('PuplisherID');
        const AdminID = urlParams.get('AdminID');
        PuplisherIDD=PuplisherID;
        AdminIDD=AdminID;
        IsAdminn=false;
      

        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/GetConversation?PuplisherID=${PuplisherID}&AdminID=${AdminID}&IsAdmin=false`)
        .then(response=> {return response.json()})
        .then(Data=>{
            RenderConvisationPuplisher(Data); })
            .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });



    const RenderConvisationPuplisher=(Convir)=>{
    
        Convir.forEach(Messege=>{ 
            if(Messege.sender==true){
                responsiveChatPush('.chat', 1, 'you', `${Messege.date}`, `${Messege.messege}`,Messege.id)
                }else{
                    responsiveChatPush('.chat', 0, 'me', `${Messege.date}`, `${Messege.messege}`,Messege.id)
                }
    
        });
        
     }
    
     document.getElementById('DeleteAll').addEventListener('click', function(){
        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/DeleteConversation?PuplisherID=${PuplisherID}&AdminID=${AdminID}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=> { if(!response.ok){
            return;
        }})
    });

    }
});


document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/Messages.html') {
        
        const urlParams = new URLSearchParams(window.location.search);
        const PuplisherID = urlParams.get('PuplisherID');
        const AdminID = urlParams.get('AdminID');
        PuplisherIDD=PuplisherID;
        AdminIDD=AdminID;
        IsAdminn=true;
    

        fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/GetConversation?PuplisherID=${PuplisherID}&AdminID=${AdminID}&IsAdmin=true`)
        .then(response=> {return response.json()})
        .then(Data=>{ 
            RenderConvisationAdmin(Data);
        }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });

        
 const RenderConvisationAdmin=(Convir)=>{
    Convir.forEach(Messege=>{ 
        if(Messege.sender==false){
        responsiveChatPush('.chat', 0, 'you', `${Messege.date}`, `${Messege.messege}`,Messege.id)
       
        }else{
            responsiveChatPush('.chat', 1, 'me', `${Messege.date}`, `${Messege.messege}`,Messege.id)
        }
    })
 }

        //here Add And Dlelete

        document.getElementById('DeleteAll').addEventListener('click', function(){
            fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Message/DeleteConversation?PuplisherID=${PuplisherID}&AdminID=${AdminID}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response=> { if(!response.ok){
                return;
            }})
        });


       
    }
});






  responsiveChat('.responsive-html5-chat')
  
  if (parent === top) {
    document.querySelectorAll('a.article').forEach(function(article) {
      article.style.display = 'block';
    });
    document.querySelectorAll('a.article2').forEach(function(article) {
      article.style.display = 'block';
    });

    
  }


