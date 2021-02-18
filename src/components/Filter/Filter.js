import PropTypes from 'prop-types'
import s from './Filter.module.css'

export default function Filter({value, onChange}) {
        return (
        <>
                <label className={s.label}>
                Find contacts by name
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className={s.input}/>
            </label>
        </>
    )
}

Filter.propTyper = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}