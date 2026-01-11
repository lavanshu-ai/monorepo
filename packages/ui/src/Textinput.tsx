"use client"

export const Textinput=({label,placeholder,onChange,error}:{
    label:string;
    placeholder:string;
    error?:string;
    onChange:(value:string)=>void;
})=>{
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={(e)=>onChange(e.target.value)} type="text" id="first_name" placeholder={placeholder} className={`${error ? "border-red-500" : "border-gray-400"} bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}/>
            {error && (
             <p className="text-xs text-red-600">
                {error}
             </p>
            )}        
        </div>
    )
}