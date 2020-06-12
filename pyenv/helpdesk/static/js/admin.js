const Admin = () => {
  //objects to store pointers for various dom elements, and other reference data
  const tabs  = { id: 'tab' };
  const user  = { id: 'user' };
  const group = { id: 'group' };

  //initializes objects by gathering dom elements
  const addTabs  = () => {
    tabs.user = document.getElementById('tab_addUser');
    tabs.group = document.getElementById('tab_addGroup');
  };
  const addUser  = () => {
    user.email        = document.getElementById('email');
    user.emailHelp    = document.getElementById('emailHelp');
    user.password     = document.getElementById('password');
    user.passwordHelp = document.getElementById('passwordHelp');
    user.check        = document.getElementById('check');
    user.checkHelp    = document.getElementById('checkHelp');
    user.select       = document.getElementById('selectGroup');
    user.fName        = document.getElementById('fName');
    user.lName        = document.getElementById('lName');
    user.submit       = document.getElementById('userSubmit');
    user.sendUrl      = '/api/addUser';
    user.getUrl       = '/api/getGroup';
  };
  const addGroup = () => {
    group.name    = document.getElementById('groupName');
    group.desc    = document.getElementById('groupDesc');
    group.submit  = document.getElementById('groupSubmit');
    group.sendUrl = '/api/addGroup';
    group.getUrl  = '/api/getGroup';
  };
  //getData allows the promises to work in tab_init
  const getData  = async (str) => {
    try {
      let response = await app.get(str);
      return response;
    } catch(err) {
      console.log(err);
    }
  };

  //does initialization for a tab when its clicked
  const tab_init = async (str) => {
    //first get data from server (if needed), reset and add modifications, then set focus to first element of form
    switch (str) {
      case 'user':
        //fetch info
        getData(user.getUrl).then((result) => {
          let data = JSON.parse(result).data;
          app.clearForm(user);
          app.fillSelect(data, user.select);
        });
        break;
      case 'group':
        app.clearForm(group);
        break;
    }
  };

  //getters and senders for passing data to server
  const letSubmit = (option) => {
    switch (option) {
      case 'user':
        let flag = 0;
        let emailFlag = (user.email.value.length > 0) ? validator.check(user.email, 'email') : '$';
        let passFlag  = (user.password.value.length > 0) ? validator.check(user.password, 'password') : '$';

         //display validation for email
        if (emailFlag == 1) {
          validator.setValid(user.email);
          user.emailHelp.setAttribute('data-success', "That's a fine email you've got there");
          flag += 1;
        } else if (emailFlag == 0) {
          validator.setInvalid(user.email);
          user.emailHelp.setAttribute('data-error', "That doesn't seem to be an email address. Try again");
        } else {
          validator.remove(user.email);

        }
        //display validation for password
        if (passFlag == 2) {
          validator.setValid(user.password);
          user.passwordHelp.setAttribute('data-success', "That's a tough-lookin password");
          flag += 1;
        } else if (passFlag == 1) {
          validator.setValid(user.password);
          user.passwordHelp.setAttribute('data-success', "Your password is acceptable, but maybe try harder?");
          flag += 1;
        } else if (passFlag == 0) {
          validator.setInvalid(user.password);
          user.passwordHelp.setAttribute('data-error', 'get gud.');
        } else {
          validator.remove(user.password);

        }
        //display validation for password check
        if (user.password.value == user.check.value && user.check.value.length > 0) {
          validator.setValid(user.check);
          user.checkHelp.setAttribute('data-success', "Those passwords match!");
          flag += 1;
        } else if (user.password.value != user.check.value  && user.check.value.length > 0) {
          validator.setInvalid(user.check);
          user.checkHelp.setAttribute('data-error', "Those passwords don't match!")
        } else {
          validator.remove(user.check);

        }
        //display validation for selectGroup
        if (user.select.options[user.select.selectedIndex].value == '$') {
          validator.setInvalid(user.select);

        } else {
          validator.setValid(user.select);
          flag += 1;
        }

        console.log(flag);

        //if everything is good, enable button
        if (flag == 4) {
          if (user.submit.classList.contains('disabled')) {
            user.submit.classList.remove('disabled');
            user.submit.disabled = false;
          }
        } else {
          if (!user.submit.classList.contains('disabled')) {
            user.submit.classList.add('disabled');
            user.submit.disabled = true;
          }

        }
        break;
      case 'group':
        console.log('group page edited')
        if (group.name.value.length > 4 && group.desc.value.length > 4) {
          console.log('success')
          if (group.submit.classList.contains('disabled')) { group.submit.classList.remove('disabled'); }
        } else {
          console.log('fail');
          (group.name.value.length < 5) ? console.log('name not long enough') :
            (group.desc.value.length < 5) ? console.log('desc not long enough') : console.log('something weird happened');
          if (!group.submit.classList.contains('disabled')) { group.submit.classList.add('disabled'); }
        }
        break;
    }
  };
  const sendData = (obj) => {
    let url = obj.sendUrl;
    let data = {};

    //go through the object passed in and remove unneeded fields and move the rest to data object
    //and reset the form
    Object.keys(obj).forEach(key => {
      switch (key) {
        case 'submit':
          obj[key].disabled = true;
          break;
        case 'sendUrl':
        case 'getUrl':
          break;
        default:
          if (obj[key].value !== undefined && key.includes('Help') === false) {
            if (key.includes('check') === false) { data[key] = obj[key].value; }
            obj[key].value = '';
          }
          break;
      }
    });

    //then send the information away
    console.log(data);
    //app.send(url, data);
  };

  return {
    run: () => {
      //create links to dom elements
      addUser();
      addGroup();
      addTabs();

      //add tab listeners
      tabs.user.addEventListener('click', () => { tab_init('user') });
      tabs.group.addEventListener('click', () => { tab_init('group') });

      //add user listeners
      user.email.addEventListener('input', () => { letSubmit('user') });
      user.password.addEventListener('input', () => { letSubmit('user') });
      user.check.addEventListener('input', () => { letSubmit('user') });
      user.select.addEventListener('input', () => { letSubmit('user') });
      user.submit.addEventListener('click', () => { sendData(user) });

      //add group listeners
      group.name.addEventListener('input', () => { letSubmit('group') });
      group.desc.addEventListener('input', () => { letSubmit('group') });
      group.submit.addEventListener('click', () => { sendData(group) });
    }
  };
};

const admin = Admin();
admin.run();
console.log('admin is loaded');