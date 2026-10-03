export default function newsApi () {
    return (
        fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=4`)
            .then(res => res.json())
    )
}