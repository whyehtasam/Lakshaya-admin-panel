import {useEffect,useState} from 'react'


const usePost = () => {
    const [postData, setPostData] = useState([]);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  return {}
}

export default usePost