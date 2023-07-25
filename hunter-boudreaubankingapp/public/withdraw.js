function Withdraw(){   
  const useEffect = React.useEffect
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [withdraw, setWithdraw] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)
  const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
  const {userBalance, setUserBalance} = React.useContext(UserContext)
  const {userName, setUsername} = React.useContext(UserContext)
  const { userEmail, setUserEmail } = React.useContext(UserContext)
  const updateBalance = JSON.parse(localStorage.getItem("usersBalance"))

  function loginStatusCheck () {
      if(localStorage.getItem('loggedIn')){
          const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"))
            setIsLoggedIn(updatedLogin)
            const newUserName = window.localStorage.getItem('token')
            const parsedUserInfo = JSON.parse(newUserName)
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
 }, [withdraw])

  function validate(field, label){
      if (!field) {
          setStatus('Error '+ label)
          setTimeout(() => setStatus(''), 3000) 
          return false; 
      }

      if(field == 0){
          setStatus(`You cannot withdraw 0. Please enter an amount to withdraw.`)
          setTimeout(()=> setStatus(''), 3000)
          return false
      }
      if (parseFloat(field) > updateBalance){
          setStatus("Transaction Failed")
          setTimeout(() => setStatus(''), 3000) 
          return false
      }

      if (parseFloat(field) < 0){
          setStatus(`You cannot withdraw a negative number. If you would like to make a deposit, please click the "Deposit" tab.`)
          setTimeout(() => setStatus(''), 3000) 
          setWithdraw('')
          return false
      }

      return true;
  }
  if(isNaN(parseFloat(withdraw)) && withdraw !== '' && withdraw !=='-'&& withdraw !=='.' && withdraw !=='-.'){
      alert('Please enter numerical values only')
      setWithdraw('')
      setDisabled(true)
  }
  function clearForm(){
      setWithdraw('')
      setShow(true)
      setDisabled(true)

  }
  const handleWithdraw = () =>{
      if (!validate(withdraw, 'Please enter an amount to withdraw')) return;

      const url = `/account/withdraw/${userEmail}/${withdraw}`;
      (async () => {
          try {
            const res = await fetch(url, {
              method: 'POST'
            });
            if (res.status === 200) {
              const data = await res.json();
              localStorage.setItem("usersBalance", JSON.stringify(data.balance))
              setUserBalance(data.balance)

            } else {
              console.log('Login failed:', res.statusText);

            }
          } catch (error) {
            console.error('An error occurred during deposit:', error);
          }
        })();
      setShow(false)

  }
if(localStorage.getItem('token')){
  return(
  

      <Card
      bgcolor='primary'
      header = "Withdraw"
      status = {status}
      body = {show ? (
          <>
          <div style={{display: 'flex', gap: 20, justifyContent: 'space-between'}}>
          <h3 style={{ textShadow: '1px 1px #333', fontSize: '20px'}}>{userName}'s Balance:</h3>
          <h3 style={{textShadow: '1px 1px #333', fontSize: '22px', textAlign: 'right'}}>${updateBalance}</h3>
          </div>
          
          <br/>
          <h3 style={{textShadow: '1px 1px #333', fontSize: '25px'}}>Withdraw Amount</h3>
          <input type='text' className="form-control" id='withdraw' min='0' style={{textAlign: 'right', fontSize: '1.3rem'}} value={withdraw} onChange={(e)=> {setWithdraw(e.currentTarget.value)
          setDisabled(false)}}/><br/>
          <div style={{display: 'flex', justifyContent: 'center'}}>
          <button type='submit' className='btn btn-light' disabled={disabled} onClick={handleWithdraw} style={{ fontSize: '1.8rem'}}>Withdraw</button>
          </div>
         
          </>
      ): (
          <>
          <h5>Success</h5>
          <button type='submit' className='btn btn-dark' onClick={clearForm}>Make Another Withdrawal</button>
          </>
      )}
    
    />
    
  )
      }else {
          window.location.assign('/')
      }
}