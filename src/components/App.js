import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import api from "../api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  // 📌 Fetch Contacts from API
  const retrieveContacts = async () => {
    try {
      const response = await api.get("/user/details");
      return response.data; // Ensure API returns correct format
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  // 📌 Add Contact
  const addContactHandler = async (contact) => {
    try {
      const request = { id: Math.floor(Math.random() * 1000000), ...contact };
      const response = await api.post("/user/create", request);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // 📌 Remove Contact
  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/user/delete/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // 📌 Fetch all contacts on load
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList contacts={contacts} getContactId={removeContactHandler} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
