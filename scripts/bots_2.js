d3.csv("data/processed/Dataset_2/content_polluters.csv", function(error, data) {
  data.forEach(d => {
      $('#b_tab_data').append('<li class="hover" onclick="showTweetsBots(\'' + d.UserID + '\', \'' +"Anonymous Bot" + '\')">' + '<b>Name: </b>' + "Anonymous Bot" + '<b> Followers: </b>' + d.NumberOfFollowers
                                    + '<b> Following: </b>' + d.NumerOfFollowings + '<b> Tweets: </b>' + parseInt(d.NumberOfTweets)
                                    +'</li>'); 
  });

});


function showTweetsBots(uid, name) {  
  $('#c_tab_data').empty();
  d3.csv("data/processed/Dataset_2/bots/b_" + uid +".csv", function(error, data) {
    $('#c_tab_data').append('<li> <h3>' + name  +'</h3></li>');
    data.forEach(d => {
      $('#c_tab_data').append('<li><br/>' + "<b>Time: </b>" + d.time + "<b><br> Tweet : </b>" + d.tweet +'</li>'); 
    });
  });
}