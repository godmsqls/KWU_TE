export default function Input({ label, onChange }) {
    const handleChange = (e) => {
        // 부모 컴포넌트의 handleInputChange 함수 호출
        onChange(label, e.target.value);
    };

    return (
        <>
            <div className='input-row'>
                <div className='label-name'>
                    <label>{label}</label>
                </div>
                <input 
                    className='text-box'
                    onChange={handleChange}
                />
            </div>
        </>
    );
}