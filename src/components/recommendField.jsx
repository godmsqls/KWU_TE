export default function RecommendField({label,children}){
    return(
        <div className="recommend-field">
            <div className="recommend-label">{label}</div>
            <div className="recommend-input">{children}</div>
        </div>
    )
}