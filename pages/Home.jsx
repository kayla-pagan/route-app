import React from "react";

export function Home(){
    function formAction(formData){
        console.log(formData.get("name"))
    }
    
    return (
    <React.Fragment>
        <h1>Current user:</h1>

        <form action={formAction}>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
    </React.Fragment>
    )
}