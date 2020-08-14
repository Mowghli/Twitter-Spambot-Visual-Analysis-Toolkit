$('#a_tab_data').empty();
$('#b_tab_data').empty();
$('#c_tab_data').empty();
d3.csv("data/processed/Dataset_1/count_master_ds1.csv", function(error, data) {

  data.forEach(d => {
    if (d.Label == "Legitimate User") {
      $('#a_tab_data').append('<li class="hover" onclick="showTweetsUsers(\'' + d.uid + '\', \'' + d.Name + '\')">' + '<b>Name: </b>' + d.Name + '<b> Followers: </b>' + d.NumberOfFollowers
                                    + '<b> Following: </b>' + d.NumberOfFollowing + '<b> Tweets: </b>' + parseInt(d.NumberOfTweets)
                                    +'</li>'); 
    }         
  });

});

function showTweetsUsers(uid, name) {  
  $('#c_tab_data').empty();
  d3.csv("data/processed/Dataset_1/users/u_" + uid +".csv", function(error, data) {
    $('#c_tab_data').append('<li> <h3>' + name  +'</h3></li>');
    data.forEach(d => {
      $('#c_tab_data').append('<li><br/>' + "<b>Time: </b>" + d.time + "<b><br> Tweet : </b>" + d.tweet +'</li>'); 
    });
  });
  document.getElementById("c_tab").click();
}