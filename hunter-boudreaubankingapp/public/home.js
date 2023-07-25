function Home(){
  const useEffect = React.useEffect
  const {userName, setUsername }= React.useContext(UserContext)
  const { userBalance, setUserBalance }= React.useContext(UserContext)
  const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)

  function checkIfLoggedIn(){
      if(localStorage.getItem("token")){
          const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"))
          setIsLoggedIn(firstLoginCheck)
      }
  }
  useEffect(() => {
      checkIfLoggedIn();
      if(isLoggedIn == true){
        const newUserName = window.localStorage.getItem('token')
        const parsedUserInfo = JSON.parse(newUserName)
        setUsername(parsedUserInfo.userName)
        setUserBalance(parsedUserInfo.userBalance.toFixed(2))
      }
    }, [isLoggedIn]);
    return(
      <Card 
        bgcolor='primary'
        txtcolor='white'
        title = "Welcome to Bad Bank"
        text= "For good banking without security"
        body= {<img src='download.png' className='img-fluid' alt='responsive image'/>}
        
     />
    )
}