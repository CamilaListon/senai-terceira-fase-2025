import { useEffect } from "react"
import { useState } from "react"
import styles from './card.module.css'

export const CardApi = () => {
    const [users, setUsers] = useState ([])

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data =>{
            setUsers(data)
        })
        console.log(users)
    },[])



    return (
        <>
        <div className={styles.cardContainerApi}>
            {
                users.map((user)=>(
                    <div className={styles.card} key={user.id}>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.address.street}</p>
                    </div>
                ))
            }
        </div>
        </>
    )
}

