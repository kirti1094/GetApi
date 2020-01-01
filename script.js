//Generic GET API CALL METHOD
function getMethod(url,callback){
  $('body #loader').show();
  $.ajax({
    type: 'get',
    url: url,
    success: function(res) {
      callback(res);
      $('body #loader').hide();
    },
    error: function(error, exception) {
      $('body #loader').hide();
      alert('Something went wrong');
    }
  });
}

//GET PLAYER DETAILS
function getDetails(search=''){
  getMethod('https://api.jsonbin.io/b/5d0c6e6a860ae0341876aac6/2',function(data){
    handlePlayerDetails(data,search)
  });
}

//HANDLE AND APPEND PLAYER DETAILS
function handlePlayerDetails(data, searchDetail=''){
  if(searchDetail!==''){
    var newArray = [];
    const regex = new RegExp(searchDetail);
    for(var index = 0;index<data.length;index++){
      if(regex.test(data[index].PFName.toLowerCase(),searchDetail) || regex.test(data[index].UpComingMatchesList[0].CCode.toLowerCase(),searchDetail)){
        newArray.push(data[index]);
      }
    }
    data = newArray;
  }
  data = data.reverse();
  if(data && data.length > 0){
    var list = '';
    for(var i = 0 ; i < data.length; i++){
      list =  list + (
        '<div class="card">'+
        '<img src="./player-images/'+ data[i].Id +'.jpg" class="card-img-top" alt="...">'+
        '<div class="card-body">'+
          '<h5 class="card-title">'+ data[i].PFName +'</h5>'+
          '<ul>'+
          '<li>Skills : <span>'+data[i].SkillDesc+'<span></li>'+
          '<li>Value : <span>$ '+data[i].Value+'</span></li>'+
          '<hr>'+
          '<li>Next Match : <span class="team">'+(data[i].UpComingMatchesList[0] ? data[i].UpComingMatchesList[0].CCode:'')+'</span>'+
            '<span class="vs">Vs</span>'+
            '<span="opposite-team">'+ (data[i].UpComingMatchesList[0] ? data[i].UpComingMatchesList[0].VsCCode:'')+'</span>'+
          '</li>'+
    
          '<li>Date: <span>' + convertDate(data[i].UpComingMatchesList[0].MDate)+'</span></li>'+
          '</ul>'+
        '</div>'+
      '</div>'
      );
  }
  $('#myRows').html(list)
  } else {
    $('#myRows').text('Noting Found')
  }
}

//GET PLAYER DETAILS BASED ON SEARCH
function searchPlayer(){
    var value = $('#playerName').val().toLowerCase();
    if(value==''){
      alert('Please enter player Name');
    } else {
      getDetails(value);
    }
}

//CONVERT DATE TO UTC
function convertDate(utcDate){
  console.log(utcDate);
  var localDate = new Date(utcDate);
 return moment(localDate).format("DD-MM-YYYY h:mm:ss a")
}

// FIRST TIME GET DETAILS ON LOAD
getDetails();