export default function Input({label,placeholder}){
    return(
        <>
        <div className='input-row'>
            <div className='label-name'>
                <label>{label}</label>
            </div>
            <input className='text-box' type="text" placeholder={placeholder}></input>
        </div>
        </>
    )
}