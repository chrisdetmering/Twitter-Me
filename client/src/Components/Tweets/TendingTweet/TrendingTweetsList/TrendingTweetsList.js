import "./TrendingTweetsList.css"; 
import { v4 as uuidv4 } from 'uuid';
import TrendingTweet from "../TrendingTweetItem/TrendingTweet"; 
import Spinner from "../../../Util/UI/Spinners/LoadingSpinner"; 
import ErrorMessage from "../../../Util/UI/Errors/ErrorMessage"; 

export default function TrendingTweetsList(props) { 
  

  const {tweets, search, loading} = props; 

  const trends = tweets.map(tweet => (
    <TrendingTweet 
      key={uuidv4()} 
      tweet={tweet}
      search={search}/>
  )); 




  return (
    <ul className="trending-tweets-list">
      <li className="trending-top"><h3>What's happening</h3></li>
      {loading ? <Spinner /> : trends}
      {!loading && <li className="trending-bottom"></li>}
    </ul>
  ); 
}