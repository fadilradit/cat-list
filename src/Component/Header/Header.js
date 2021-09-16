import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

import './Header.css'





function Header(){
    const history = useHistory()

    const [keyWord, setKeyWord] = useState("")


    console.log(keyWord);
    return(
        <nav className = "header-body">

            <div className = "content-header" >
                <div onClick = {() => {history.push('/')}} className = 'header-title'>
                    <h1>HOME</h1>
                </div>

                <div className = 'search'>
                    <input
                    onChange = {(e) => { setKeyWord(e.target.value) }}
                    onKeyPress = {(ev) => {
                        console.log(`Pressed keyCode ${ev.key}`);
                        if (ev.key === 'Enter') {
                          
                            history.push("/search/"+keyWord)
                            window.location.reload()
                            ev.preventDefault();
                        }
                      }}
                    placeholder = "Search . . ." />
                </div>
            </div>

            </nav>
    )
}

export default Header;