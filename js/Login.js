localStorage.clear();



document.getElementById('LoginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let Email = document.getElementById('Email').value;
    let Password = document.getElementById('Password').value;
    var token='';
    const payload = {
        email: Email,
        password: Password
    };

    fetch(` https://zakimohammad2-001-site1.etempurl.com/api/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.text().then(text => {
            if (!response.ok) {
                var myButton = document.getElementById('myBtn');
                if (myButton) {
                    myButton.click();
                }
                document.getElementById('MessegeFOrSigin').innerText=text;
                return Promise.reject(`Failed to log in: ${text}`);
            }
            return text;
        });
    })
    .then(Token => {
       
        localStorage.setItem('Token', Token);
        token=Token;


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
        
        const decodedToken = parseJwt(token);
        
        
        if (decodedToken) {
          
            const image = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"];
            const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
            const id = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
            const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(role);
            if(role==1)
                window.location.href='indexAdmin.html';
            else
            window.location.href='IndexPuplisher.html';

        } else {
            console.error("Failed to decode token.");
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
});





