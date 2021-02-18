import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import s from './Section.module.css'
import fade from '../../fade.module.css'

export default function Section({ title, children }) {
    return (
        <div className={s.section}>
            <CSSTransition in={true} appear timeout={500} classNames={fade}>
                <h1 className={s.title}>{title}</h1>
            </CSSTransition>
                {children}
        </div>
    )
}

Section.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}