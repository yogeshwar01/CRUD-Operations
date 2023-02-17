import './App.css';
import React, { useEffect, useState } from 'react'
function App() {
  const [users, setUser] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    fetch("http://localhost:3000/users").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setName(resp[0].name)
        setMobile(resp[0].mobile)
        setEmail(resp[0].email)
        setUserId(resp[0].id)
      })
    })
  }

  function deleteUser(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  function selectUser(id) {
    let item = users[id - 1];
    setName(item.name)
    setEmail(item.email)
    setMobile(item.mobile);
    setUserId(item.id)
  }
  function updateUser() {
    let item = { name, mobile, email }
    console.warn("item", item)
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  function saveData() {
    let item = { name, mobile, email }
    // console.warn(data);
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  return (
    <div className="App">
      <div className="parent">
        <h1>CRUD Operations in ReactJS </h1>
        <table border="1" style={{ float: '' }} className="Table">
          <tbody border="1px">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Mobile</td>
              <td colSpan={2}>Operations</td>
            </tr>
            {
              users.map((item, i) =>
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td><button onClick={() => deleteUser(item.id)} className="delete-btn">Delete</button></td>
                  <td><button onClick={() => selectUser(item.id)} className="update-btn">Update</button></td>


                </tr>
              )
            }
          </tbody>
        </table>

        <div className="update">
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} /> <br /><br />
          <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br /><br />
          <input type="text" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /> <br /><br />
          <button onClick={updateUser} className="updateUser-btn">Update User</button>
          {/* <button onClick={saveData} type="button" className="updateUser-btn">save User</button> */}


        </div>
        <div className="saveUser">
          <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} /> <br /> <br />
          <input type="text" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /> <br /> <br />
          <input type="text" name="mobile" value={mobile} onChange={(e) => { setMobile(e.target.value) }} /> <br /> <br />
          <button type="button" onClick={saveData} className="updateUser-btn">Add User</button>
        </div>
      </div>
    </div>
  );

}
export default App;