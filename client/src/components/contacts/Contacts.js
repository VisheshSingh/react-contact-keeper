import React, { Fragment, useContext } from 'react';
import ContactState from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactState);
  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />;
      })}
    </Fragment>
  );
};

export default Contacts;
