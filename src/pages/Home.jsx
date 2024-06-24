import React, { useState, useActionState, useOptimistic } from "react";
import { updateDB } from "../api";
import { Header } from "../components/Header";

export function Home(){
    const [state, actionFunction, isPending] = useActionState(
        formAction, 
        {
            name: JSON.parse(localStorage.getItem("name")) || "Anonymous user",
            email: JSON.parse(localStorage.getItem("email")) || "user@example.com",
            error: null
        } 
    )

    const [visibleFormID, setVisibleFormID] = useState(null)
    const [optimisticValue, setOptimisticValue] = useOptimistic(state)

    async function formAction(prevState, formData){
        setOptimisticValue({ 
            ...prevState, name: formData.get("name") || 
            prevState.name, email: formData.get("email") || 
            prevState.email })

        try {
            if (formData.get("name")) {
                const newName = await updateDB(formData.get("name"), null)
                return {...prevState, name: newName, error: null}
            } else if (formData.get("email")) {
                const newEmail = await updateDB(null, formData.get("email"))
                return {...prevState, email: newEmail, error: null}
            }
        } catch (error) {
            return {...prevState, error}
        } finally {
            setVisibleFormID(null)
        }
        
    }

    function toggleDisplay(formID) {
        setVisibleFormID(formID)
    }
    
    return (
    <React.Fragment>
        <Header />
        
        <h1>Current user: <span>{optimisticValue.name}</span></h1>
        <svg onClick={() => toggleDisplay("username-form")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
            />
        </svg>
        {visibleFormID === "username-form" && (
                <form action={actionFunction} id="username-form">
                    <input type="text" name="name" placeholder="enter new username" required/>
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setVisibleFormID(null)}>Cancel</button>
                </form>
            )}


        <h1>Current email: <span>{optimisticValue.email}</span></h1>
        <svg onClick={() => toggleDisplay("email-form")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" 
            />
        </svg>
        {visibleFormID === "email-form" && (
            <form action={actionFunction} id="email-form">
                <input type="email" name="email" placeholder="enter new email" required/>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setVisibleFormID(null)}>Cancel</button>
            </form>
        )}

        {isPending && state.error && <p>{state.error.message}</p>}
    </React.Fragment>
    )
}