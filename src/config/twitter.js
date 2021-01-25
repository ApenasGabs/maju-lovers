const Twitter = require('twitter');
 
let client = new Twitter({
  consumer_key: 'Dw7L3d1RCdGzPb7ingVkLDOzE',
  consumer_secret: 'PW62aIbSIq7bf0IAYKA3fX1k9Qsgt6xYESRbuHWz0HlKKwPyiB',
  access_token_key: '1239791887252406272-RtxJlIoPsICLpgU5cZFBBFOScddYSF',
  access_token_secret: 'dw4EBiFpcx4Ujp9UjzsBozklYIdY83Mw7uwCUOyxduHaB'
});
 
let params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error)
        throw new Error(error);
});

module.exports = client;