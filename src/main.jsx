import ReactDOM from 'react-dom/client';
import App from './App';
import ProvideContext from './context/ProvideContext'
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(<ProvideContext><App /></ProvideContext>)