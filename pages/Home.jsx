import React from "react";

export function Home(){
    return (
    <React.Fragment>
        <h1>Current user:</h1>

        <form>
            <input type="text" name="name" required/>
            <button type="submit">Update</button>
        </form>
    </React.Fragment>
    )
}