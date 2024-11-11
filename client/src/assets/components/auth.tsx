

interface AuthProps {
    Card: JSX.Element;
}

export default function Auth({ Card }: AuthProps){
    return(
        <div className="flex bg-gradient-to-t from-gray-900 via-neutral-800 to-black h-screen justify-center "> 
        {Card} 
        </div>
    )
}