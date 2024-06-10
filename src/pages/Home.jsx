import React, { useState } from "react";
import { updateNameInDB } from "../api";

export function Home(){
    const [name, setName] = useState(() => JSON.parse(localStorage.getItem("name")) || "Anonymous user")

    async function formAction(formData){
        try {
            const newName = await updateNameInDB(formData.get("name"))
            setName(newName)
        }
        catch {
            console.log(error.message)
        }
        
    }
    
    return (
    <React.Fragment>
        <h1>Current user: <span>{name}</span></h1>

        <form action={formAction}>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
    </React.Fragment>
    )
}