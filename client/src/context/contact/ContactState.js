import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  DELETE_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initState = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sam Smith',
        email: 'ss@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Sneaky Pete',
        email: 'spete@gmail.com',
        phone: '333-333-3333',
        type: 'professional'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initState);

  //   ADD_CONTACT

  //   DELETE_CONTACT

  //   SET_CURRENT

  //   DELETE_CURRENT

  //   UPDATE_CONTACT

  //   FILTER_CONTACTS

  //   CLEAR_FILTER

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
