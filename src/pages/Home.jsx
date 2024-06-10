import React, { useState, useActionState } from "react";
import { updateNameInDB } from "../api";

export function Home(){
    const [state, actionFunction, isPending] = useActionState(
        formAction, 
        {
            name: JSON.parse(localStorage.getItem("name")),
            error: null
        } || "Anonymous user"
    )

    async function formAction(prevState, formData){
        try {
            const newName = await updateNameInDB(formData.get("name"))
            return {name: newName, error: null}
        } catch (error) {
            return {...prevState, error}
        }
        
    }
    
    return (
    <React.Fragment>
        <h1>Current user: <span>{state.name}</span></h1>
        {isPending && <p>Loading...</p>}
        <form action={actionFunction}>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
        {state.error && <p>{state.error.message}</p>}
    </React.Fragment>
    )
}