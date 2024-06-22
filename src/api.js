export async function updateDB(newName, newEmail) {
    // Sleep for 1500ms to mimic an API call round trip
    await new Promise(resolve => setTimeout(resolve, 1500))

    if(newName) {
        if (newName.toLowerCase().includes("error")) {
            throw new Error("Failed to update name")
        }
        localStorage.setItem("name", JSON.stringify(newName))
        return newName
    } else if (newEmail) {
        localStorage.setItem("email", JSON.stringify(newEmail))
        return newEmail
    }
    
    
   
}

// TODO: add firebase api so that there can be a login function to replace the update name in database function