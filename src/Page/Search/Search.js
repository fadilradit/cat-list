import React, {Component} from 'react'
import axios from 'axios'

import './Search.css'
import defaultImage from '../../image/UserIcon.png'

class Search extends Component{

    constructor(props){
        super(props);
        this.state = {
            resultData: [],
            keyWord: this.props.match.params.item,
            isLoading: true
        }
    }

    componentDidMount(){
        this.getData()
    }


    getData(){
        const {keyWord} = this.state 
        axios.defaults.headers.get['x-api-key'] = '5f5ba81f-659d-4ced-957e-0dab876ce5ed';

        axios.get('https://api.thecatapi.com/v1/breeds')
        .then(res => {
            

            const filterData = res.data.filter(item => {
                return(
                    item.name.toLowerCase().includes(keyWord.toLowerCase()) ||
                    item.origin.toLowerCase().includes(keyWord.toLowerCase())
                )
            })

            this.setState({resultData: filterData, isLoading: !this.state.isLoading})

            

            
        })

    }

    renderSearchData(){
        const {resultData} = this.state

        if(resultData.length == 0){
            return(
                <div  style = {{marginTop: "51px", height: "74vh", display: "flex", justifyContent: "center", alignContent: "center"}}>
                <h1 style = {{alignSelf: "center", fontFamily: "'Pacifico', cursive", fontSize: "25px", letterSpacing: "1px", fontWeight: "lighter" }} >Sorry we couldn't find what you were looking for</h1>
            </div>
            )
            
        }else{
            return resultData.map((item, i) => {
                if(item.image == undefined){
                    return(
                        <div className = "card" id = "card" >
                            <div  className = "card-image" id = "card-image">
                            <img src = {defaultImage} alt = "Image" />
                            </div>
                            <label className = "card-name" >Name: {item.name}</label>
                            <p className = "card-origin" >Origin:{item.origin}</p>
                            
                            <div className = {"expand"+i} id = "expand" >
                                <div className = "desc" id = "desc" >
                                    <p>{item.description}</p>
                                </div>
                                <div className = "stats" id = "stats"   >
                                    <h1 className = "label-stats" id = "label-stats" >Status:</h1>
                                    
                                    <label>Energy :&nbsp;{item.energy_level}</label>
                                    <label>Affection :&nbsp;{item.affection_level}</label>
                                    <label>Grooming :&nbsp;{item.grooming}</label>
                                    <label>intelligentce :&nbsp;{item.intelligence}</label>
                                    <label>Health Issues :&nbsp;{item.health_issues}</label>
                                    <label>Child Friendly :&nbsp;{item.child_friendly}</label>
                                    
                                </div>
                            </div>
                        
    
                            
                            <button onClick = {(() => {this.detailToogle(i)})} >Detail</button>
                            
                        </div>
                    )
                }else{
                    return(
                        <div className = "card" id = "card" >
                            
                            <div  className = "card-image" id = "card-image">
                            <img src = {item.image.url} alt = "Image" />
                            </div>
                            <p className = "card-name" >Name: {item.name}</p>
                            <p className = "card-origin" >Origin:{item.origin}</p>
                            <div className = {"expand"+i} id = "expand" >
                                <div className = "desc" id = "desc" >
                                    <p>{item.description}</p>
                                </div>
                                <div className = "stats" id = "stats"   >
                                    <h1 className = "label-stats" id = "label-stats" >Status:</h1>
                                    
                                    <label>Energy :&nbsp;{item.energy_level}</label>
                                    <label>Affection :&nbsp;{item.affection_level}</label>
                                    <label>Grooming :&nbsp;{item.grooming}</label>
                                    <label>intelligentce :&nbsp;{item.intelligence}</label>
                                    <label>Health Issues :&nbsp;{item.health_issues}</label>
                                    <label>Child Friendly :&nbsp;{item.child_friendly}</label>
                                    
                                </div>
                            </div>
                            <button onClick = {(() => {this.detailToogle(i)})} >Detail</button>
                        </div>
                    )
                }
            })
        }

        
    }

    detailToogle (i){

        const expand = document.querySelector('div.expand'+i)

        

        expand.classList.toggle('slide')

    }

    render(){
        const {isLoading} = this.state

        if(isLoading){
            return(
                <div  style = {{marginTop: "51px", height: "90vh", display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <h1 style = {{alignSelf: "center", fontFamily: "'Pacifico', cursive", fontSize: "30px", letterSpacing: "1px" }} >Loading . . .</h1>
                </div>
            )
        }

        return(
            <div className = "search-body" id = "search-body" >
                <h1>Look What We Found!</h1>

                <div className = "search-container" >
                    {this.renderSearchData()}
                </div>
            </div>
        )
    }

}

export default Search;