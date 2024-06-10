import React, { useState, useActionState } from "react";
import { updateNameInDB } from "../api";

export function Home(){
    const [state, actionFunction, isPending] = useActionState(
        formAction, 
        JSON.parse(localStorage.getItem("name")) || "Anonymous user"
    )

    async function formAction(prevState, formData){
        try {
            const newName = await updateNameInDB(formData.get("name"))
            return newName
        } catch (error) {
            console.error(error.message)
        }
        
    }
    
    return (
    <React.Fragment>
        <h1>Current user: <span>{state}</span></h1>
        {isPending && <p>Loading...</p>}
        <form action={actionFunction}>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
    </React.Fragment>
    )
}