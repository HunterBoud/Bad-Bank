function CreateAccount(){
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [created, setCreated] = React.useState('create account')
  const [disabled, setDisabled] = React.useState(true)
  const useEffect = React.useEffect
  const {userName, setUsername }= React.useContext(UserContext)
  const { userBalance, setUserBalance }= React.useContext(UserContext)
  const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)

  function checkIfLoggedIn(){
      if(localStorage.getItem("token")){
          const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"))
          setIsLoggedIn(firstLoginCheck)
      } else {
          setShow(true)
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
  function validate(field, label){
      if (!field) {
          setStatus('Error '+ label)
          setTimeout(() => setStatus(''), 3000) 
          return false; 
          

      }

      if(password.length < 8){
          setStatus('Your password must be at least 8 characters long')
          setTimeout(() => setStatus(''), 3000) 
          return false; 

      }
          return true
  }
  function clearForm(){
      setName('')
      setEmail('')
      setPassword('')
      setShow(true)

  }

  const handleCreate = () =>{
      if (!validate(name, 'name')) return;
      if (!validate(email, 'email')) return;
      if (!validate(password, 'password'))  return;
      const url = `/account/create/${String(name)}/${String(email)}/${String(password)}`;

      (async()=> {
          let res = await fetch(url)
          let data = await res.json()
      })
      ();
      clearForm()
      setCreated("Add Another Account")
      
      setTimeout(()=> {
          alert("Successfully Created Account")
      }, 200)

  }
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (
        <>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input
              type="input"
              className="form-control"
              id="nameInput"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                setDisabled(false);
              }}
              style={{ width: '200px' }}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="input"
              className="form-control"
              id="emailInput"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                setDisabled(false);
              }}
              style={{ width: '200px' }}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setDisabled(false);
              }}
              style={{ width: '200px' }}
            />
          </div>
  
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCreate}>
            Create Account
          </button>
        </>
      ) : (
        <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-dark" onClick={clearForm}>
            Add Another Account
          </button>
        </>
      )}
    />
  );
}