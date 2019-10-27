import axios from 'axios';
import { DEFAULT_URL } from '../actions/types';

export default axios.create({
    baseURL: DEFAULT_URL,
    headers: {'Content-Type': 'application/json'}
});