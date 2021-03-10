import "./TrendingTweet.css"; 

export default function TrendingTweet(props) { 
  const {tweet, search } = props; 

  const count =  (tweet.tweet_volume / 1000).toFixed(1); 

  function onTweetClick() { 
    search(tweet.name.replace('#', '')); 
  }

  return(<>
    <li 
      className="trending-tweet"
      onClick={onTweetClick} >
      <p className="trending-info">Trending - USA</p>
      <p className="trending-tweet-text">{tweet.name}</p>
      <p className="trending-info">{count}k Tweets</p>
    </li>
  </>); 


}