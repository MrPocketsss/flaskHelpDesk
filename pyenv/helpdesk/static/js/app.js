const Application = () => {
  //stores page elements
  const ele = {};
  const sendToServer  = (url, data) => {
    var xmlhttp = new XMLHttpRequest(); //create new instance

    //handle stuff returned from server (i.e: flash message)
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) { //if the readystate has been changed to done
        if (xmlhttp.status != 200) { //and the status is not done
          //error handling?
        }
        else { // the status is done
          if (JSON.parse(xmlhttp.responseText).success == 1) { //data was successfully posted to server
            let msg = JSON.parse(xmlhttp.responseText).message;
            M.toast({html: msg, classes: 'green'});
          }
          else { //something went wrong
            let msg = JSON.parse(xmlhttp.responseText).message;
            M.toast({html: msg, classes: 'red, lighten-1'});
          }
        }
      }
    }

    //handle sending the data
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(data));
    console.log(data);
  };
  const getFromServer = (url) => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(request.status);
          }
        }
      };
      request.ontimeout = () => { reject('timeout') };
      request.open('get', url, true);
      request.send();
    })
  }
  const fillDropDown  = (items, select) => {
    //clear options already present, except for the first option
    for (let i = select.length; i > 0; i--) {
      select.remove(i);
    }
    //then fill dropdown with new options
    for (let i = 0; i < items.length; ++i) {
      let option = document.createElement('option');
      option.text = items[i].name;
      option.value = items[i].id;
      select.add(option);
    }
  };
  const clearForm     = (obj) => {
    //go through the object passed in reset the form, skipping properties that would be bad to wipe
    Object.keys(obj).forEach(key => {
      switch (key) {
        case 'submit':
          obj[key].disabled = true;
          break;
        case 'sendUrl':
        case 'getUrl':
          break;
        default:
          if (obj[key].value !== undefined) {
            obj[key].value = '';
          }
          break;
      }
    });
  };
  //function to set a given theme/color scheme
  const setTheme      = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  };
  //function to toggle between themes
  const toggleTheme   = () => {
    if (localStorage.getItem('theme') === 'theme-light') { setTheme('theme-dark'); }
    else if (localStorage.getItem('theme') === 'theme-dark') { setTheme('theme-light'); } 
    else { setTheme('theme-dark'); }

  };
  //function to handle the navigation menu
  const navInit       = () => {
    ele.menu    = document.getElementById('menu');
    ele.navbar  = document.getElementById('navbar');
    ele.content = document.getElementById('content');
    //listen for window resize and modify the navigation
    window.addEventListener('resize', () => {
      //if the window is not small now
      if (window.innerWidth > 700) {
        //make sure navbar is visible
        if (!ele.navbar.classList.contains('active')) { 
          ele.navbar.classList.toggle('active')
        }
      } else {
        //otherwise hide it
        if (ele.navbar.classList.contains('active')) {
          ele.navbar.classList.toggle('active');
        }
      }
    });
    //add click listener for small screens
    ele.menu.addEventListener('click', () => {
      ele.menu.classList.toggle('change');
      ele.navbar.classList.toggle('active');
    }); 
    //listen for click on main element, and close navbar if its open
    ele.content.addEventListener('click', () => {
      if (ele.navbar.classList.contains('active')) { 
        ele.navbar.classList.toggle('active'); 
      }
      if (ele.menu.classList.contains('change')) {
        ele.menu.classList.toggle('change');
      }
    });
  };
  return {
    run: () => {
      setTheme('theme-dark');
      navInit();
    },
    send: sendToServer,
    get:  getFromServer,
    fillSelect: fillDropDown,
    clearForm: clearForm
  }
};

const app = Application();
app.run();
console.log('app is loaded');