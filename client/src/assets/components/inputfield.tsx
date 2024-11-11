import { ChangeEvent } from 'react';

interface inputType{
    name:string;
    placeholder:string;
    type?:string
    onChange: (e:ChangeEvent<HTMLInputElement>) => void 
}

export default function Inputfield({name,placeholder,type,onChange}:inputType){
    return(<div className="flex flex-col p-2 "> 
               <div className="p-2 font-semibold">{name}</div>
      <input  onChange={onChange} type = {type ||"text"} className="p-1  mx-2 flex justify-center border-2 border-slate-500 hover:border-black" placeholder={placeholder}></input>
       
        </div>

    )
}
