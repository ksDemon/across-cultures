myID = document.getElementById('navigation');

window.onwheel = e => {
    if(e.deltaY >= 0){
        myID.className = "hide"
    } else {
      myID.className = "show"
    }
  }