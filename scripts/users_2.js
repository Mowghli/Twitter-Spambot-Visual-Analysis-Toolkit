// Clearing old data
$('#a_tab_data').empty();
$('#b_tab_data').empty();
$('#c_tab_data').empty();
d3.csv("data/processed/Dataset_2/legitimate_users.csv", function(error, data) {

  data.forEach(d => {
      $('#a_tab_data').append('<li class="hover" onclick="showTweetsUsers(\'' + d.UserID + '\', \'' + "Anonymous User" + '\')">' + '<b>Name: </b>' + "Anonymous User" + '<b> Followers: </b>' + d.NumberOfFollowers
                                    + '<b> Following: </b>' + d.NumerOfFollowings + '<b> Tweets: </b>' + parseInt(d.NumberOfTweets)
                                    +'</li>'); 
  });

});

function showTweetsUsers(uid, name) {  
  $('#c_tab_data').empty();
  d3.csv("data/processed/Dataset_2/users/u_" + uid +".csv", function(error, data) {
    $('#c_tab_data').append('<li> <h3>' + name  +'</h3></li>');
    data.forEach(d => {
      $('#c_tab_data').append('<li><br/>' + "<b>Time: </b>" + d.time + "<b><br> Tweet : </b>" + d.tweet +'</li>'); 
    });
  });
  document.getElementById("c_tab").click();
}