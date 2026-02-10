import Profile from "./Profile";

function Navbar() {
  return (
    <nav>
      <Profile />
      <button>Dashboard</button>
      <button>Register User</button>
    </nav>
  );
}

export default Navbar;
