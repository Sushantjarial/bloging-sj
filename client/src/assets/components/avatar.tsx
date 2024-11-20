interface AvatarProps {
    name?: string | null
    color?:string
    big?: Boolean
}

export default function Avatar({name,color,big}: AvatarProps){
    return(
        <div className={`${big ? 'w-9 h-9 text-3xl' : 'w-6 h-6'} ${color ? `bg-${color}-500` : 'bg-green-500'} rounded-full font-bold text-center text-black`}>
            {name?.charAt(0).toUpperCase()}
        </div>
    )
}