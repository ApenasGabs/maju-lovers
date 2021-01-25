const Twitter = require('twitter');
 
let client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
let params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error)
        throw new Error(error);
});

module.exports = client;