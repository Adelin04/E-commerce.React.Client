export const UseError = (error = null) =>{
    if(error !== null)
        return <div className="error">{error}</div>
}

