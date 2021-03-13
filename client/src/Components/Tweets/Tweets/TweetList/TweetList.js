import Tweet from "../Tweet/Tweet"; 

export default function TweetList({ tweets }) { 
  return (<>
    <ul style={{display: "inline-block", width: "600px", padding: "0"}}>
      {tweets.map(tweet => (
        <Tweet 
        key={tweet.id}
        tweet={tweet}
      />
      ))}
    </ul>
  </>); 
}