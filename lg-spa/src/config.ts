const REACT_APP_API_URL = (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3210')
	? 'http://localhost:3000/api'
	: '/api';

const SCORES_API_URL = "https://scores.lomazgames.com/scores"
export { SCORES_API_URL };
export default REACT_APP_API_URL;
