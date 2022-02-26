import "./App.css";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";

import * as service from "./service/github.service";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState([]);

  const getUserInfo = (username) => {
    service.getUserInfo(`${username}`).then((res) => {
      console.log(res);
      return res.data;
    });
  };

  const getUsers = (q) => {
    setUsers([]);

    //reset the list and dont call the API if we pass nothing
    if (q == "") {
      return;
    }

    //call our axios service to search for users with our query
    service.searchUser(`${q}`).then((res) => {
      //takes in promises, returns one promise that will resolve when all of the promises resolve (promiseception)
      Promise.all(
        //call getUserInfo on every item in the array of users, then return an array of the results
        res.data.items.map((item) =>
          service.getUserInfo(item.login).then((res) => res.data)
        )
      ).then((usrs) => setUsers(usrs)); //output the array that promise all returns and set our state array to it
    });
  };

  //optional chaining to avoid e.target && e.target.value
  const updateQuery = (e) => getUsers(e?.target?.value);

  //function to call getusers whenever a change is detected (after debouncing thru lodash)
  const debouncedOnChange = debounce(updateQuery, 500);

  return (
    <div className="main">
      <input type="text" className="search-bar" onChange={debouncedOnChange} />

      <section className="user-list">
        {users.length > 0 ? (
          <div className="user-list-header">
            <p>Avatar</p>
            <p>Name</p>
            <p>Username</p>
            <p>Followers</p>
          </div>
        ) : null}

        {users.map((value, index) => (
          <ListItem users={users} value={value} key={index} />
        ))}
      </section>
    </div>
  );
}

const ListItem = ({ users, value }) => {
  return (
    <div className="list-item">
      <div>
        <img src={value.avatar_url} className="avatar" alt="avatar" />
      </div>
      <p>{value.name}</p>
      <p>{value.login}</p>
      <p>{value.followers}</p>
    </div>
  );
};

export default App;