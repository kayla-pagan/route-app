import React, { useActionState, useOptimistic } from "react";
import { updateNameInDB } from "../api";
import { Header } from "../components/Header";

export function Home(){
    const [state, actionFunction, isPending] = useActionState(
        formAction, 
        {
            name: JSON.parse(localStorage.getItem("name")),
            error: null
        } || "Anonymous user"
    )

    const [optimisticName, setOptimisticName] = useOptimistic(state.name)

    async function formAction(prevState, formData){
        setOptimisticName(formData.get("name"))
        try {
            const newName = await updateNameInDB(formData.get("name"))
            return {name: newName, error: null}
        } catch (error) {
            return {...prevState, error}
        }
        
    }
    
    return (
    <React.Fragment>
        <Header />
        <h1>Current user: <span>{optimisticName}</span></h1>
        {/* add edit icon */}
        {/* when icon is pressed, then display the form below */}
        <form action={actionFunction}>
            <input type="text" name="name" placeholder="enter new username" required/>
            {/* TODO: Add email input and then add to state */}
            <button type="submit">Update</button>
        </form>
        {isPending && state.error && <p>{state.error.message}</p>}
    </React.Fragment>
    )
}