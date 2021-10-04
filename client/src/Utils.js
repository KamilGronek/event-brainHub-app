export const handleError = (errors, field)=>{
    return errors
    .filter((error) => error.field === field)
    .map(error=>(<strong key={error.id} style={{color:"red"}}>{error.message}</strong>))
}