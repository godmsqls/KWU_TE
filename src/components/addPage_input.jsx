export default function Input({label}){
    return(
        <>
        <div className='input-row'>
            <div className='label-name'>
                <label>{label}</label>
            </div>
            <input className='text-box'></input>
        </div>
        </>
    )
}