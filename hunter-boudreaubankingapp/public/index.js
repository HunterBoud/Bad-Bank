function Spa() {
  const [userName, setUsername] = React.useState(null)
  const [userBalance, setUserBalance] = React.useState(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState(null)

  function logOut() {
      localStorage.clear()
      location.assign('/')
  }

  return(
      <HashRouter>
          <UserContext.Provider value={{userName, setUsername, userBalance, setUserBalance, isLoggedIn, setIsLoggedIn, logOut, userEmail, setUserEmail}}>
          <NavBar/>
          <Route path='/' exact component={Home}></Route>
          <Route path='/CreateAccount/' component={CreateAccount}></Route>
          <Route path='/login/' component={Login}></Route>
          <Route path='/deposit/' component={Deposit}></Route>
          <Route path='/withdraw' component={Withdraw}></Route>
          <Route path='/balance/' component={Balance}></Route>
          <Route path='/alldata/' component={AllData}></Route>
          </UserContext.Provider>
      </HashRouter>
  )
}

ReactDOM.render(
  <Spa />,
  document.getElementById('root')

)