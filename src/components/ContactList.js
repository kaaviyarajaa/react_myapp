import React from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

    const deleteConactHandler = (id) => {
        props.getContactId(id);
      };

    
      const renderContactList = props.contacts.map((contact) => {
        return (
          <ContactCard
            contact={contact}
            clickHander={deleteConactHandler}
            key={contact.id}
          />
        );
      });

    return (
      <div class="main">

        <h1></h1>
        <h2>

          ContactList
          <Link to="/add">
        <button className="ui button blue right">Add Contact</button>
        </Link>
        </h2>
        <div className="ui celled list">{renderContactList}</div>
      </div>
    );
    }       


export default ContactList;