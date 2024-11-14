interface AvatarProps {
    name?: string | null
    color?:string
    big?: Boolean
}

export default function Avatar({name,color,big}: AvatarProps){
    return(
        <div className={`${big ? 'w-10 h-10 text-3xl' : 'w-6 h-6 '} bg-green-500 rounded-full font-bold text-center opacity-70`}>{name}</div>
    )
}