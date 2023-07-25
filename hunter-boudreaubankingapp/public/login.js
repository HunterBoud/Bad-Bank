function Login(props){
  const useEffect = React.useEffect
  const [show, setShow] = React.useState(true)
  const { logOut } = React.useContext(UserContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {userName, setUsername }= React.useContext(UserContext)
  const { userBalance, setUserBalance }= React.useContext(UserContext)
  const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
  const { userEmail, setUserEmail }= React.useContext(UserContext)
  const [isVisible, setIsVisible] = React.useState(false)

      useEffect(() => {
          checkIfLoggedIn();
          if(isLoggedIn == true){
            const newUserName = window.localStorage.getItem('token')
            const parsedUserInfo = JSON.parse(newUserName)
            setUsername(parsedUserInfo.userName)
            setUserBalance(parsedUserInfo.userBalance.toFixed(2))
          }
        }, [isLoggedIn]);
      function handleLogin() {
          const url = `/account/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
          
          (async () => {
            try {
              const res = await fetch(url);
              if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem("token", JSON.stringify(data.token))
               JSON.stringify(localStorage.setItem("loggedIn", true))
                const newData = localStorage.getItem("token")
                localStorage.setItem("usersEmail", JSON.stringify(data.token.userEmail))
                setUsername(data.token.userName)
                const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"))
                setIsLoggedIn(updatedLogin)
                localStorage.setItem("usersBalance", JSON.stringify(data.token.userBalance.toFixed(2)))
                setUserBalance(data.token.userBalance)
          checkIfLoggedIn()

              } else {
                console.log('Login failed:', res.statusText);
                setIsVisible(true)
  
              }
            } catch (error) {
              console.error('An error occurred during login:', error);
            }
          })();
        }
        
      function checkIfLoggedIn(){
          if(localStorage.getItem("token")){
              setShow(false)
              const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"))
              setIsLoggedIn(firstLoginCheck)
          } else {
              setShow(true)
          }
      }
      function clearForm(){
          setEmail('')
          setPassword('')
          setShow(false)
  
      }
      return(
  <Card
          bgcolor='primary'
          header = "LOGIN"
          status = {status}
          body = {show ? (
              <>
              <br/>
              
              <input type='input' className="form-control" id='email'value={email} placeholder="EMAIL" onChange={e=> {
                  setEmail(e.currentTarget.value)
                  }}/>
              <br/>
              <input type='password' className="form-control" id='password'value={password} placeholder="PASSWORD" onChange={e=>{
                      setPassword(e.currentTarget.value)
              } }/><br/>
              <button type='submit' className='btn btn-dark'style={{fontSize: '2.5rem'}} onClick={handleLogin}>Login</button>
              
              {isVisible ? <div style= {{color:'blue', backgroundColor: '#ffffff8f', borderRadius: '10px', textAlign: 'center', marginTop: '20px'}}>Username or Password is invalid. Please try again.</div> : <div></div>}
  
              </>
          ): (
              <>
              <h5>Welcome back {userName}!</h5>
              <button type='submit' className='btn btn-light' style={{width: "60%"}} onClick={logOut}>Logout</button>
              </>
          )}
        
        />
      
  
      )
  }
  

  
