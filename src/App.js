import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CSSTransition } from 'react-transition-group';
import s from './App.module.css'
import Section from './components/Section'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from "./components/ContactList"
import Filter from "./components/Filter"
import Notification from './components/Notification'
import fade from './fade.module.css'

class App extends Component {

  state = {
    contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
         ],
    filter: '',
    NotificationData: '',
    showNotification: false
  }

  formSubmitHandler = data => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      this.setState({showNotification: true, NotificationData: `${data.name} is already in contacts`})
      this.closeNotification()
      return
    } else if (data.name === '') {
      this.setState({showNotification: true, NotificationData: `Name field are empty`})
      this.closeNotification()
      return
    } else if (data.number === '') {
      this.setState({showNotification: true, NotificationData: `Number field are empty`})
      this.closeNotification()
      return
    }
    
    this.setState({ contacts: [{ name: data.name, id: uuidv4(), number: data.number }, ...this.state.contacts,] })
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  }

  deleteContacts = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  closeNotification() {
    setTimeout(() => {
      this.setState({ showNotification: false })
    }, 2000);
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts)) 
    }
  }
  render() {

    const { showNotification, filter, NotificationData } = this.state;

    const normalizedFilter = this.state.filter.toLowerCase()

    const visiableContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  
    return (
      <div className={s.container}>
        <Section title='Phonebook'>
          <ContactForm onSubmit={this.formSubmitHandler}/>
        </Section>
        <Section title='Contacts'>
          <Filter value={filter} onChange={this.changeFilter} />
        </Section>
        <ContactList contacts={visiableContacts} onDeleteContact={this.deleteContacts} />
        <CSSTransition in={showNotification}
          timeout={250}
          classNames={fade}
          unmountOnExit>
           <Notification alert={NotificationData}/>
        </CSSTransition>
      </div>
    );
  }
}

export default App;