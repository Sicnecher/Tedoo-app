import style from './style.module.css'
import profileImage from './../../static/github-profile.jpg'
import { useEffect, useRef } from 'react'

export default function Component(){

    return (
        <footer className={style.barBody}>
            <section>
                <div className={style.searchContainer}>
                    <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-search"  style={{fontSize: '14px'}} />
                    </span>
                    <input
                    type="text"
                    className={style.input}
                    placeholder='Search'
                    aria-label="Search"
                    />
                </div>
            </section> 
            <section>
                <div className={style.icons}><i className="bi bi-house-door" />Home</div>
                <div className={style.icons}><i className="bi bi-chat" />Messaging</div>
                <div className={style.icons}><i className="bi bi-bell" />Notifications</div>
                <img className={style.profileWrapper} src={profileImage} alt="profile image" width={50} height={50} />
            </section>           
        </footer>
    )
}