import React, {Component} from 'react'
import axios from 'axios';

import './Home.css'
import defaultImage from '../../image/UserIcon.png'



class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            breedData: [],
            startPage: 0,
            endPage:10,
            sliceData:[]
        }
        this.getData = this.getData.bind(this)
        this.scrollEnd = this.scrollEnd.bind(this)
        
    }

     scrollEnd(){

        setTimeout(() => {
            if(
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ){
                const {breedData, sliceData, startPage, endPage} = this.state
                
                
                if(sliceData.length ==! breedData.length || sliceData.length < breedData.length ){
                const dataResult = breedData.slice(startPage, endPage)
            this.setState({sliceData: [...this.state.sliceData, ...dataResult],startPage: startPage+10, endPage: endPage+10
                            })
            ;}
                
                
            }

        },3000)
        
            
        
    }

    componentDidMount(){
        this.getData()
        window.addEventListener('scroll', this.scrollEnd)
    }

    getData() {
        const {startPage, endPage} = this.state

        axios.defaults.headers.get['x-api-key'] = '5f5ba81f-659d-4ced-957e-0dab876ce5ed';
        
        axios.get('https://api.thecatapi.com/v1/breeds')
        .then(res => {
            const minData = res.data.slice(0, 10)
            this.setState({breedData: res.data, sliceData: minData, startPage: startPage+10, endPage: endPage+10})
            
          
        })

    }

    detailToogle (i){

        const expand = document.querySelector('div.expand'+i)


        expand.classList.toggle('slide')

    }

    detailButton(){
        
    }

    renderList(){
        const {sliceData} = this.state

        return sliceData.map((item, i) => {

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

    loadingHandler(){
        return(
            <div>
                <h1>Loading. . .</h1>
            </div>
        )
    }

    render(){
        {this.scrollEnd()}
        if(this.state.sliceData.length === 0 ){
            return(
                <div className = "home-body" style = {{height: "100vh"}} >
                    <h1>Cat<i>List</i></h1>
                    <div style = {{width: "100%", height:"85%", display: "flex", justifyContent: "center", alignContent: "center"}} >
                    <h3 style = {{fontWeight: "bolder", fontSize: "30px", justifySelf: "center", alignSelf: "center"}} >Loading . . .</h3>
                    </div>
                    
                </div>
            )
        }
        return(
            <div className = "home-body" >
                <h1>Cat<i>List</i></h1>
                <div className = "home-container" >
                   {this.renderList()}
                </div>
            </div>
        )
    }

}

export default Home;