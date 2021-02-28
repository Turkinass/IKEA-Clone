
   

const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const profile = document.querySelector('#profile');
const profileheader = document.querySelector('.profile-head');

const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    db.collection('usersInfo').doc(user.uid).get().then(doc => {
    const userInfo=`
    <div class="row">
    <div class="col-md-6">
           <label >First name</label>
       </div>
       <div class="col-md-6">
           <p id="fname">${doc.data().fname}</p>
       </div>
   </div>
   <div class="row">
       <div class="col-md-6">
           <label>Last name</label>
       </div>
       <div class="col-md-6">
           <p id="lname">${doc.data().lname}</p>
       </div>
   </div>
   <div class="row">
       <div class="col-md-6">
           <label>Email</label>
       </div>
       <div class="col-md-6">
           <p id="email">${user.email}</p>
       </div>
   </div>
    <div class="row">
       <div class="col-md-6">
           <label>Role</label>
       </div>
       <div class="col-md-6">
           <p id="role">user</p>
       </div>
   </div>`;
   const userHeader=` <h5 id="headName">
   ${doc.data().fname} ${doc.data().lname}
</h5>
<h6 id="headRole">
  User
</h6>`;
profileheader.innerHTML=userHeader;
   profile.innerHTML=userInfo;
    });
  
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    
  } else {
    profileheader.innerHTML='';
    profile.innerHTML='';
   
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};
   // setup materialize components
