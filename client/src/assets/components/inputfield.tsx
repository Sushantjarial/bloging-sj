import { ChangeEvent } from 'react';

interface inputType{
    name:string;
    placeholder:string;
    type?:string
    onChange: (e:ChangeEvent<HTMLInputElement>) => void 
}

export default function Inputfield({name,placeholder,type,onChange}:inputType){
    return(
        <div className="flex flex-col p-2"> 
            <div className="p-2 font-semibold text-green-500">{name}</div>
            <input  
                onChange={onChange} 
                type={type ||"text"} 
                className="p-1 mx-2 flex justify-center  bg-black text-white focus:border-green-500 hover:border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500" 
                placeholder={placeholder}>
            </input>
        </div>
    )
}
