import React, { Fragment, useContext } from 'react';
import ContactState from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactState);
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <Fragment>
      {filtered === null
        ? contacts.map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })
        : filtered.map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
    </Fragment>
  );
};

export default Contacts;
