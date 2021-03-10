import "./TrendingTweetsList.css"; 
import { v4 as uuidv4 } from 'uuid';
import TrendingTweet from "../TrendingTweetItem/TrendingTweet"; 


export default function TrendingTweetsList(props) { 
  const {tweets, search} = props; 

  const trends = tweets.map(tweet => (
    <TrendingTweet 
      key={uuidv4()} 
      tweet={tweet}
      search={search}/>
  )); 

  return (
    <ul className="trending-tweets-list">
      <li className="trending-top"><h3>What's happening</h3></li>
        {trends}
      <li className="trending-bottom"></li>
    </ul>
  ); 
}