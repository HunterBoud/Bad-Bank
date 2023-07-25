function checkLoggedIn() {
    const token = localStorage.getItem('token');
    if(token){
        return true;
    } else {
        return false
    }
  }

  module.exports = {checkLoggedIn} 