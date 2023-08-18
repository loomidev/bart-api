import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(()=>{
            fetch(url, {signal: abortCont.signal})
            .then(res => {
                if(!res.ok){
                    throw Error('Nepodarilo sa načítať data')
                }
                return res.json()
            })
            .then((data) => {
                setLoading(false)
                setError(null)
                setData(data)
            })
            .catch((error)=>{
                setLoading(false)
                setData(null)
                setError(error.message);
            })
        },1000)
        
        return () => abortCont.abort()
    },[url]);

  return {data, loading,  error}

}

export default useFetch