import React, { Component } from 'react'
import s from './Notification.module.css'

class Notification extends Component {
    render() {
        return (
            <div className={s.thumb}>
                <p className={s.text}>{this.props.alert}</p>
            </div>
        )
    }
} 

export default Notification;