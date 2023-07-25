function Deposit(){
  const useEffect = React.useEffect
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [deposit, setDeposit] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)
  const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
  const {userBalance, setUserBalance} = React.useContext(UserContext)
  const {userName, setUsername} = React.useContext(UserContext)
  const { userEmail, setUserEmail } = React.useContext(UserContext)
  const updateBalance = JSON.parse(localStorage.getItem("usersBalance"))

  function loginStatusCheck () {
      if(localStorage.getItem('loggedIn')){
          const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"))
          //   console.log("value of localStorage loggedIn" + updatedLogin)
            setIsLoggedIn(updatedLogin)
            const newUserName = window.localStorage.getItem('token')
            const parsedUserInfo = JSON.parse(newUserName)
          //   console.log(parsedUserInfo.userName)
          //   console.log(parsedUserInfo.userEmail)
            setUsername(parsedUserInfo.userName)
            setUserBalance(updateBalance)
            setUserEmail(parsedUserInfo.userEmail)
      }
  }

  function balanceCheck() {
      setUserBalance(updateBalance)
  }

useEffect(()=> {
  loginStatusCheck();
},[])
 useEffect(()=> {
  balanceCheck();
  // console.log(deposit)
 }, [deposit])

  // console.log(deposit)
  function validate(field, label){
      if (!field) {
         
          
          setStatus("Please enter numeric values only")
          setTimeout(() => setStatus(''), 3000) 
          return false; 
      }

      if (field < 0){
          setStatus(`Please enter positive numbers only`)
          setTimeout(() => setStatus(''), 3000) 
          setDeposit('')
          return false
      }
      

      return true;
  }
  if(isNaN(parseFloat(deposit)) && deposit !== '' && deposit !=='-' && deposit !=='.' && deposit !=='-.'){
      alert('Please enter numerical values only')
      setDeposit('')
  }

  function clearForm(){
      setDeposit('')
      setShow(true)
      setDisabled(true)

  }
  const handleDeposit = () =>{

      if (!validate(deposit, 'Please enter a deposit amount')) return;

      setShow(false)

      // console.log(deposit);
      const url = `/account/deposit/${userEmail}/${deposit}`;
      (async () => {
          try {
            const res = await fetch(url, {
              method: 'POST'
            });
            if (res.status === 200) {
              const data = await res.json();
              // console.log(data);
              localStorage.setItem("usersBalance", JSON.stringify(data.balance))
              setUserBalance(data.balance)
            } else {
              console.log('Login failed:', res.statusText);

            }
          } catch (error) {
            console.error('An error occurred during deposit:', error);
          }
        })();
      
  }
if(localStorage.getItem('token')){
  return(
      <Card
      bgcolor='primary'
      header = "Deposit"
      status = {status}
      body = {show ? (
          <>

<div style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}>
  <h3 style={{ textShadow: '1px 1px #333', fontSize: '20px' }}>{userName}'s Balance:</h3>
  <h3 style={{ textShadow: '1px 1px #333', fontSize: '22px', textAlign: 'right' }}>${userBalance}</h3>
</div>


          <br/>
          <h3 style={{textShadow: '1px 1px #333', fontSize: '25px'}}>Deposit Amount</h3>
          <input type='text' className="form-control" id='withdraw' value={deposit} min='0' style={{textAlign: 'right', fontSize: '1.3rem'}} onChange={(e)=> {setDeposit(e.currentTarget.value)
          setDisabled(false)}}/><br/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <button type='submit' className='btn btn-light' disabled={disabled} onClick={handleDeposit} style={{ fontSize: '1.8rem'}}>Deposit</button>
          </div>
          </>
      ): (
          <>
          <h5>Success</h5>
          <button type='submit' className='btn btn-light' onClick={clearForm}>Add Another Deposit</button>
          </>
      )}
    
    />
  )
} else {
  window.location.assign('/')
}
}