
import {useState, type ChangeEvent, type FormEvent} from 'react'
import './login.css'
import {loginApi } from '../../shared/config/api'
import {type AxiosResponse, type AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Login(){
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();


    const handleChange=(e: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target; 

        setFormData({ ...formData, [name]: value });

    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
       
        e.preventDefault();
        const message = "invalid"

        if(loading){
            return;
        }

        setLoading(true);


        loginApi(formData).then((res: AxiosResponse)=>{
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('currentUser', JSON.stringify(res.data.user));
            navigate('/home');
        }).catch(
            (error:AxiosError) =>{
                console.log(error);
                toast.error(message);
            }
        ).finally(() => {
             setLoading(false);
        });
            
     

    }

    return(
        <div className = "login-wrapper">
            <h1>Sign in</h1>
            <form className = "login-form" onSubmit={handleSubmit} action = "">
                <input name= "username" onChange = {handleChange} value={formData.username} type= "text" placeholder="username" />
                <input name= "password" onChange = {handleChange} value={formData.password} type = "text" placeholder = "password"/>
                <button type = "submit">Submit</button>
                <button type="button" onClick={() => navigate('/register')}>Go to Register Page</button>
            </form>
            
            
        </div>

    )
    
}