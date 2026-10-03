const API_KEY = '55914722-15bc7f8b19294807aa7335c95'

export default function apiNetural () {
return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&per_page=20&orientation=horizontal`)
    .then(res => res.json());
}