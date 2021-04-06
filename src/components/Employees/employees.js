import React, { useState, useEffect } from 'react'
import "./employees.scss"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Card from './Employee/employee'


const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '6067781acecaa80c6b9639e2';

const Employees = () => {

    const [user, setUser] = useState()
    const [filteredUser, setFilteredUser] = useState(
        {
            input: "",
            Searched: "",
            filteredArr: ""
        })

    useEffect(() => {
        axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } })
            .then(response => {
                console.log(response.data.data)
                const arr = response.data.data.slice(0, 10)
                setUser([...arr])
            })
            .catch(console.error)
    }, []);

    const handleChange = (e) => {
        setFilteredUser({
            ...filteredUser,
            input: e.target.value
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (!filteredUser.input) {
            return
        }

        // filtered by firstName or userName
        const newArr = user.filter(user => (user.firstName.includes(filteredUser.input) || user.lastName.includes(filteredUser.input)))
        setFilteredUser({
            ...filteredUser,
            filteredArr: [...newArr],
            Searched: filteredUser.input
        })
    }

    // All users
    let allUsersData
    if (user) {
        allUsersData = user.map((user, idx) => {
            return <Card
                key={idx}
                name={user.firstName}
                lName={user.lastName}
                email={user.email}
                image={user.picture}
            />
        })
    }

    // Filtered user
    let filteredUserData
    if (filteredUser.filteredArr) {
        filteredUserData = filteredUser.filteredArr.map(user =>
            <Card
                name={user.firstName}
                lName={user.lastName}
                email={user.email}
                image={user.picture}
            />)
    }

    return (
        <div className='employees-container'>
            <form onSubmit={(e) => { handleSearch(e) }}>
                <input onChange={(e) => { handleChange(e) }} value={filteredUser.input} placeholder="Search..." />
                <button type="submit">{<FontAwesomeIcon icon={faSearch} style={{ color: "#777e8e" }} />}</button>
            </form>
            <div className='employees-wrapper'>
                {
                    (filteredUserData && (filteredUser.input === filteredUser.Searched)) ?
                        filteredUserData :
                        allUsersData
                }
            </div>
        </div>
    )
}
export default Employees