
import { useNavigate } from 'react-router-dom';


export const useHome = () => {
    const navigate = useNavigate()

    

    
    return {
        navigate

    }
}