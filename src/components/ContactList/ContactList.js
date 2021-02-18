import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import fade from '../../fade.module.css'
import s from './ContactList.module.css'

export default function ContactList({ contacts, onDeleteContact }) {
    return ( 
        <TransitionGroup component='ul' className={s.list}>
            {contacts.map(contact => (
                <CSSTransition key={contact.id} timeout={500} classNames={fade}>
                    <li className={s.item}>
                    {contact.name}: {contact.number}
                    <button onClick={ () => onDeleteContact(contact.id)} className={s.button}>Delete</button>
                </li>
                </CSSTransition>
                )
            )} 
        </TransitionGroup>
    ) 
}

ContactList.propType = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
}