  //author: Mohanad Saeed Bawazir

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      setupUI(user);
     
    } else {
      console.log('user logged out');
      setupUI(user);
    
    }
  });
// signup

const signupForm = document.querySelector('#signup-form');
if(signupForm!=null){
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const fname = signupForm['signup-fname'].value;
  const lname = signupForm['signup-lname'].value;
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
    
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
 
    return db.collection('usersInfo').doc(cred.user.uid).set({
        fname:fname,
        lname:lname,
    
      });
    }).then(() => {
   

    // close the signup modal & reset form
    
  
    signupForm.reset();
  });
});
}


// login
const loginForm = document.querySelector('#login-form');
if(loginForm!=null){
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    console.log(cred.user);
    // close the signup modal & reset form
    
    console.log("welcome");
    window.location.replace("userProfile.html");
    
    loginForm.reset();
  });
});
}


// logout

const logout = document.querySelector('#logout');
if(logout!=null){
logout.addEventListener('click', (e) => {
  
    console.log("farewell");
  e.preventDefault();
  auth.signOut();
  window.location.replace("homepage.html");
    
});
}





