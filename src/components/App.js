import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useState, useEffect } from 'react';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
  const AddContactHandler = (contact) => {
    // console.log(contact);
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
    
  };
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id; 
    });
    setContacts(newContactList);
  }
  // useEffect(() => {
  //   const retreiveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retreiveContacts)setContacts(retreiveContacts);
  // }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className='ui container'>
      <Header />
      <AddContact AddContactHandler ={AddContactHandler}/>
      <ContactList contacts={contacts} getContactId= {removeContactHandler} />
    </div>
  );
}

export default App;
