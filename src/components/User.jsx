import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../redux/userSlice";


function User() {
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addUser({ id: Date.now(), name: "Tripti" })
    );
  };

  return (
    <div>
      <button onClick={handleAdd}>Add User</button>

      {users.map((user) => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => dispatch(deleteUser(user.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default User;
