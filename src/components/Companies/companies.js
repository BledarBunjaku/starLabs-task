import React, { useState, useEffect } from 'react'
import "./companies.scss"
import axios from 'axios'
import Company from './Company/company'

const APP_ID = 'efd4ae1f';
const APP_KEY = '8ed313453c30899dd143812aec57aca9';

const Main = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`)
            .then(response => {
                console.log("response", response.data.hits)
                setRecipes([...response.data.hits])
            })
    }, [])

    return (
        <div className='companies-container'>
            {recipes.map((recipe, idx) => {
                return <Company
                    key={idx}
                    image={recipe.recipe.image}
                    menu={recipe.recipe.label}
                    rank={idx + 1}
                    type={recipe.recipe.cuisineType}
                    source={recipe.recipe.source}
                />
            })}
        </div>
    )
}
export default Main



// const APP_ID = 'efd4ae1f';
// const APP_KEY = '8ed313453c30899dd143812aec57aca9';
// const request = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

// const [recepies, setRecepies] = useState([]);
// const [search, setSearch] = useState('')
// const [submit, setSubmit] = useState('banana')
// // const [number, setNumber] = useState(2)

// useEffect(() => {
//     console.log('effectttttt')
//     getRecepies();
// }, [submit])

// const getRecepies = async () => {
//     const response = await fetch(`https://api.edamam.com/search?q=${submit}&app_id=${APP_ID}&app_key=${APP_KEY}`)
//     const data = await response.json();
//     const modifyArray = data.hits.map(obj => ({ ...obj, nrAmount: 1 }))
//     setRecepies([...modifyArray])
//     console.log('datassss', modifyArray)
// }

