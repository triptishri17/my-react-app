
 function Navbar() {
  return (
   <div>
    <button onClick={()=> setPage ("home")}>Home</button>
    <button onClick={()=> setPage("login")}>Register</button>
    <button onClick={()=> setPage("login")}>Register</button>
    <button onClick={()=>{
      console.log("About clicked");
      setPage("about");}
    }></button>
  </div>
  );
}

export default Navbar;
