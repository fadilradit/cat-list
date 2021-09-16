import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './Page/Home/Home'
import Header from './Component/Header/Header'
import Search from './Page/Search/Search'

class App extends Component{

    

    render(){
        return(
            <BrowserRouter>

                <div>
                    <Header/>
                </div>

                <div>
                    <Route path = "/" exact component = {Home} />
                    <Route path = "/search/:item" component = {Search} />
                </div>
            </BrowserRouter>
        )
    }

}

export default App;