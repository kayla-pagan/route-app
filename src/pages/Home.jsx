import React, { useActionState, useOptimistic } from "react";
import { updateNameInDB } from "../api";

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
        <h1>Current user: <span>{optimisticName}</span></h1>
        
        <form action={actionFunction}>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
        {state.error && <p>{state.error.message}</p>}
    </React.Fragment>
    )
}