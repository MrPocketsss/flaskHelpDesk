const Form = () => {
  //Some private variables for the instance
  const ele = {};
  //sets maximum height the textareas can reach
  var MAX_HEIGHT = 0;
  // init: Creates instance of Form
  const init = (formToStart) => {
    //instantiate the correct form
    switch (formToStart) {
      case 'new_ticket':
        //grab all the elements for the new tickets form and store them in const ele
        getEles('new_ticket');
    
        //add event listeners for input elements
        ele.name.addEventListener('input', () => { validate(ele.name, ele.lblName, 'text'); });
        ele.agency.addEventListener('input', () => { validate(ele.agency, ele.lblAgency, 'text') });
        ele.phone.addEventListener('input', () => { validate(ele.phone, ele.lblPhone, 'phone'); });
        ele.phoneTip.addEventListener('animationend', () => { ele.phoneTip.classList.remove('showTooltip'); });
        ele.email.addEventListener('input', () => { validate(ele.email, ele.lblEmail, 'email'); });
        ele.problem.addEventListener('input', () => { resize(ele.problem, ele.lblProblem); });
        ele.problem.addEventListener('change', () => { addTimeStamp(ele.problemTimer, ele.problem); })
        ele.resolution.addEventListener('input', () => { resize(ele.resolution, ele.lblResolution); });
        ele.resolution.addEventListener('change', () => { addTimeStamp(ele.resolveTimer, ele.resolution); })
        ele.status.addEventListener('input', () => { validate(ele.status, ele.lblStatus, 'status') });
        ele.submit.addEventListener('click', () => { formSubmit('/new_ticket'); });
        ele.submit.addEventListener('onkeydown', (event) => { 
          if (event.keyCode === 13) { formSubmit('/new_ticket'); }
        });
        
        //change MAX_HEIGHT based on screen size
        //set it initally after a slight delay for animation
        setTimeout(() => { getMaxHeight(); }, 1000);
        //then listen for the screen to resize to calculate it again
        window.addEventListener('resize', () => {
          console.log('--------------------------------------------------------------------------------');
          console.log('\twindow is changing sizes');
          console.log('\tmax height before: ' + MAX_HEIGHT);
          let flag = getMaxHeight();
          if (flag == 1) {
            setTimeout(() => { getMaxHeight(); }, 30 );
            console.log('\tmax height after: ' + MAX_HEIGHT);
            resize(ele.problem, ele.lblProblem);
            resize(ele.resolution, ele.lblResolution);
          } else {
            console.log('\tmax height after: ' + MAX_HEIGHT);
            resize(ele.problem, ele.lblProblem);
            resize(ele.resolution, ele.lblResolution);
          }
          
        });
        break;
      case 'addClientForm':
        getEles('client');

        //when toggle button is clicked for add client/person field, show the appropriate form
        ele.smAddPage.toggle.addEventListener('click', () => {
          ele.smAddPage.addClient.classList.toggle('hide');
          ele.smAddPage.addPerson.classList.toggle('hide');
        });
        //set up form listeners
        //add page client form
        ele.addClientForm.name.addEventListener('input', () => { validate(ele.addClientForm.name, ele.addClientForm.nameLbl, 'text'); });
        ele.addClientForm.address.street1.addEventListener('input', () => { validate(ele.addClientForm.address.street1, ele.addClientForm.address.street1Lbl, 'none') });
        ele.addClientForm.address.street2.addEventListener('input', () => { validate(ele.addClientForm.address.street2, ele.addClientForm.address.street2Lbl, 'none') });
        ele.addClientForm.address.city.addEventListener('input', () => { validate(ele.addClientForm.address.city, ele.addClientForm.address.cityLbl, 'text') });
        ele.addClientForm.address.state.addEventListener('input', () => { validate(ele.addClientForm.address.state, ele.addClientForm.address.stateLbl, 'text') });
        ele.addClientForm.address.zip.addEventListener('input', () => { validate(ele.addClientForm.address.zip, ele.addClientForm.address.zipLbl, 'zip') });
        ele.addClientForm.phone.addEventListener('input', () => { validate(ele.addClientForm.phone, ele.addClientForm.phoneLbl, 'phone') });

        //add page personnel form
        ele.addPersonnelForm.name.first.addEventListener('input', () => { validate(ele.addPersonnelForm.name.first, ele.addPersonnelForm.name.firstLbl, 'text') });
        ele.addPersonnelForm.name.last.addEventListener('input', () => { validate(ele.addPersonnelForm.name.last, ele.addPersonnelForm.name.lastLbl, 'text') });
        ele.addPersonnelForm.org.client.addEventListener('input', () => { validate(ele.addPersonnelForm.org.client, ele.addPersonnelForm.org.clientLbl, 'status'); });
        ele.addPersonnelForm.org.position.addEventListener('input', () => { validate(ele.addPersonnelForm.org.position, ele.addPersonnelForm.org.positionLbl, 'text'); });
        ele.addPersonnelForm.org.department.addEventListener('input', () => { validate(ele.addPersonnelForm.org.department, ele.addPersonnelForm.org.departmentLbl, 'text'); });
        ele.addPersonnelForm.phone.type.addEventListener('input', () => { validate(ele.addPersonnelForm.phone.type, ele.addPersonnelForm.phone.typeLbl, 'status'); });
        ele.addPersonnelForm.phone.number.addEventListener('input', () => { validate(ele.addPersonnelForm.phone.number, ele.addPersonnelForm.phone.numberLbl, 'phone'); });
        ele.addPersonnelForm.phone.extension.addEventListener('input', () => { validate(ele.addPersonnelForm.phone.extension, ele.addPersonnelForm.phone.extensionLbl, 'ext'); });
        ele.addPersonnelForm.email.addEventListener('input', () => { validate(ele.addPersonnelForm.email, ele.addPersonnelForm.emailLbl, 'email'); });
        break;
      }
  };
  // get all the elements for the form
  const getEles = (formString) => {
    switch (formString) {
      case 'new_ticket':
        ele.container     = document.querySelector('.new_ticket');
        ele.rows          = ele.container.querySelectorAll('.row');
        ele.name          = document.getElementById('name');
        ele.lblName       = ele.name.labels[0];
        ele.agency        = document.getElementById('agency');
        ele.lblAgency     = ele.agency.labels[0];
        ele.phone         = document.getElementById('phone');
        ele.lblPhone      = ele.phone.labels[0];
        ele.phoneTip      = ele.phone.previousElementSibling;
        ele.email         = document.getElementById('email');
        ele.lblEmail      = ele.email.labels[0];
        ele.problem       = document.getElementById('problem');
        ele.lblProblem    = ele.problem.labels[0];
        ele.problemTimer  = [];
        ele.resolution    = document.getElementById('resolution');
        ele.lblResolution = ele.resolution.labels[0];
        ele.resolveTimer  = [];
        ele.status        = document.getElementById('status');
        ele.lblStatus     = ele.status.labels[0];
        ele.submit        = document.getElementById('submit');
        break;
      case 'client':
        ele.smAddPage = {};
          ele.smAddPage.toggle    = document.querySelector('.checkbox');
          ele.smAddPage.addClient = document.getElementById('addClient');
          ele.smAddPage.addPerson = document.getElementById('addPersonnel');

        ele.addClientForm = {};
          ele.addClientForm.name     = document.getElementById('nameField');
          ele.addClientForm.nameLbl  = ele.addClientForm.name.labels[0];
          
          ele.addClientForm.address = {};
            ele.addClientForm.address.street1    = document.getElementById('street1Field');
            ele.addClientForm.address.street1Lbl = ele.addClientForm.address.street1.labels[0];
            ele.addClientForm.address.street2    = document.getElementById('street2Field');
            ele.addClientForm.address.street2Lbl = ele.addClientForm.address.street2.labels[0];
            ele.addClientForm.address.city       = document.getElementById('cityField');
            ele.addClientForm.address.cityLbl    = ele.addClientForm.address.city.labels[0];
            ele.addClientForm.address.state      = document.getElementById('stateField');
            ele.addClientForm.address.stateLbl   = ele.addClientForm.address.state.labels[0];
            ele.addClientForm.address.zip        = document.getElementById('zipField');
            ele.addClientForm.address.zipLbl     = ele.addClientForm.address.zip.labels[0];
          ele.addClientForm.phone    = document.getElementById('clientPhoneField');
          ele.addClientForm.phoneLbl = ele.addClientForm.phone.labels[0];
          ele.addClientForm.submit   =  document.getElementById('addClientSubmit');

        ele.addPersonnelForm = {};
          ele.addPersonnelForm.name      = {};
            ele.addPersonnelForm.name.first    = document.getElementById('firstNameField');
            ele.addPersonnelForm.name.firstLbl = ele.addPersonnelForm.name.first.labels[0];
            ele.addPersonnelForm.name.last     = document.getElementById('lastNameField');
            ele.addPersonnelForm.name.lastLbl  = ele.addPersonnelForm.name.last.labels[0];
          ele.addPersonnelForm.org       = {};
            ele.addPersonnelForm.org.client        = document.getElementById('clientField');
            ele.addPersonnelForm.org.clientLbl     = ele.addPersonnelForm.org.client.labels[0];
            ele.addPersonnelForm.org.position      = document.getElementById('positionField');
            ele.addPersonnelForm.org.positionLbl   = ele.addPersonnelForm.org.position.labels[0];
            ele.addPersonnelForm.org.department    = document.getElementById('deptField');
            ele.addPersonnelForm.org.departmentLbl = ele.addPersonnelForm.org.department.labels[0];
          ele.addPersonnelForm.phone     = {};
            ele.addPersonnelForm.phone.type         = document.getElementById('phoneTypeField');
            ele.addPersonnelForm.phone.typeLbl      = ele.addPersonnelForm.phone.type.labels[0];
            ele.addPersonnelForm.phone.number       = document.getElementById('phoneField');
            ele.addPersonnelForm.phone.numberLbl    = ele.addPersonnelForm.phone.number.labels[0];
            ele.addPersonnelForm.phone.extension    = document.getElementById('extensionField');
            ele.addPersonnelForm.phone.extensionLbl = ele.addPersonnelForm.phone.extension.labels[0];
          ele.addPersonnelForm.email     = document.getElementById('emailField');
          ele.addPersonnelForm.emailLbl  = ele.addPersonnelForm.email.labels[0];
          ele.addPersonnelForm.submit    = document.getElementById('addPersonSubmit');
        break;
    }
  };
  // validate: Runs validation code against form elements
  const validate = (element, label, typeStr) => {
    let re = '';
    let regexFlag = false;
    switch(typeStr) {
      //validate regular text fields
      case 'text':
        regexFlag = false;
        re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        regexFlag = re.test(element.value.trim());
        if (element.value.length > 0 && regexFlag) { add(element, 'valid'); }
        else if (element.value.length > 0 && !regexFlag) { add(element, 'invalid'); }
        else if (element.value.length == 0) { add(element, 'none'); }
        break;
      //validation for phone numbers
      case 'phone':
        regexFlag = false;
        //if phone number is blank remove all styling
        if (element.value.length < 1) {
          add(element, label, 'none');
        }
        //if we haven't written a full phone number
        else if (element.value.length < 10) {
          //create a buffer element, holding the value of the input, but remove any non-digits
          buffer = element.value.replace(/[^0-9]/g, '');
          //if the buffer value doesn't match the input value, there are non-digits in the input
          if (buffer !== element.value) {
            //show the tooltip saying not to do that, if it isn't already showing

            if (!element.previousElementSibling.classList.contains('showTooltip')) {
              element.previousElementSibling.classList.add('showTooltip');
            }
            //set the value of the input to one with only digits
            element.value = buffer;
          }
          //the input has only digits, so hide the tooltip if it was showing
          else {
            if (element.previousElementSibling !== null) {
              if (element.previousElementSibling.classList.contains('show')) {
                element.previousElementSibling.classList.remove('show');
              }
            }
          }
          //set the label above if the user clicks away
          if(element.value.length > 0) { add(element, 'filled'); }
        }
        //we have at least a full phone number, so validate it now
        else if (element.value.length > 9 && element.value.length < 15) {
          //the regex, and the test of the input value against the regex
          re = /(^[0-9]{10}:[0-9]{3})|(^[0-9]{10})/;
          regexFlag = re.test(element.value);
          //if we're good, display valid color, otherwise its wrong
          (regexFlag) ? add(element, 'valid') : add(element, 'invalid'); 
        } else {
          add(element, 'invalid');
        }
        break;
      //validate email fields
      case 'email':
        regexFlag = false;
        re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        //keep the label raised if there is text present, but not a full 
        if (element.value.length > 0 && element.value.indexOf('@') == -1) {
          add(element, 'filled');
        } else if (element.value.length > 0) {
          //if there's text present, and an @ sign, check for valid email
          regexFlag = re.test(element.value);
          //if the test is true, add valid - otherwise false
          (regexFlag) ? add(element, 'valid') : add(element, 'invalid'); 
        }
        break;
      //validate dropdowns
      case 'status':
        (element.value == '$') ? add(element, 'none') : add(element, 'valid');
        break;
      //add extension filed validation for phone number extensions
      case 'ext':
        regexFlag = false;
        re = /^[0-9]*$/; //only match numbers
        //if there's stuff in the field
        if (element.value.length > 0) {
          //and its an appropriate length
          if (element.value.length > 2) {
            //add appropriate validation
            (re) ? add(element, 'valid') : add(element, 'invalid');
          } else { //if not long enough yet, set to filled
            add (element, 'filled');
          }
        } else { //if there's nothing in the field, drop label
          add(element, 'none');
        }
        break;
      //add zip field validation
      case 'zip':
        regexFlag = false;
        re = /^[0-9]{5}(?:-[0-9]{4})?$/;
        //if there's stuff in the field
        if (element.value.length > 0) {
          //and its an appropriate length
          if (element.value.length > 4) {
            //add appropriate validation
            (re) ? add(element, 'valid') : add(element, 'invalid');
          } else { //if its not long enough yet, set to filled
            add(element, 'filled');
          }
        } else { //if there's nothing there, lower label
          add(element, 'none');
        }
        break;
      //add filled if text is present, valid if more than a bit is filled in, otherwise nothing
      case 'none':
        (element.value.length > 5) ? add(element, 'valid') : (element.value.length > 0) ? add(element, 'filled') : add(element, 'none');
        break;
    }
  };
  //add: helper function for modifying classes on elements
  const add = (element, classToAdd) => {
    //creates a list of classes you can add to an element
    //valid: for valid entries
    //invalid: for invalid entries
    //filled: for inclomplete entries
    var classArray = ['valid', 'invalid', 'filled'];
    //if 'none' is passed in, remove all classes from array on element
    if (classToAdd == 'none') {
      for (let i = 0; i < classArray.length; ++i) {
        element.classList.remove(classArray[i]);
      }
    } else {
      //otherwise add the appropriate class, but get rid of the rest
      var addedClassIndex = classArray.indexOf(classToAdd);
      for (let i = 0; i < classArray.length; ++i) {
        if (i !== addedClassIndex) {
          element.classList.remove(classArray[i]);
        } else {
          element.classList.add(classToAdd);
        }
      }
    }
  }
  //resize: helper function for modifying textareas the way I want
  const resize = (element) => {
    console.log('\tresize function called on: ' + element.id);
    //if I have ANY content
    if (element.value.length > 0) {
      console.log('\t\telement has values. Raising label');
      //raise the label up
      add(element, 'filled');
      //then check for resizing
      let lineHeight   = parseInt(window.getComputedStyle(element).lineHeight, 10), //gets number of pixels in the line height
          height   = element.clientHeight + 2, //viewable height of the element in pixels, no border, scrollbar or margin + borderHeight
          scrollHeight = element.scrollHeight; //minimum height required to fit everything without a scrollbar, in pixels
      console.log('\t\tlineheight: ' + lineHeight);
      console.log('\t\tviewable height: ' + height);
      console.log('\t\tscroll height: ' + scrollHeight);
      
      //if I have more room than I need
      if (height > scrollHeight) {
        console.log('\t\tElement has more room than it needs. Reducing')
        //shrink by "one line" until the content is smaller
        while (height >= element.scrollHeight) {
          element.style.height = (height -= lineHeight) + 'px';
          console.log('\t\t\tshrinking by one line. New height is: ' + element.style.height);
        }
        //then add pixels back to the height to offset the larger removal
        while (height < element.scrollHeight) {
          element.style.height = (++height) + 'px';
          console.log('\t\t\telement is just a little too small. Adding back some. New height is: ' + element.style.height);
        }
      }
      //otherwise I need more room
      else if (height < scrollHeight && height < MAX_HEIGHT) {
        console.log('\t\telement is too small. Growing.');
        //add "one line" at a time until I'm big enough
        while (height < element.scrollHeight && height < MAX_HEIGHT) {
          element.style.height = (height += lineHeight) + 'px';
          console.log('\t\t\tGrowing by one line. New height is: ' + element.style.height);
        }
        //then remove pixels until we're at scrollheight or MAX_HEIGHT
        while (height > element.scrollHeight || height > MAX_HEIGHT) {
          element.style.height = (--height) + 'px';
          console.log('\t\t\tElement is just a little too big. Shrinking. New height is: ' + element.style.height);
        }
      } 
      //if the height somehow got bigger than max height, shrink
      else if (height > MAX_HEIGHT) {
        console.log('height has exceeded bounds. Matching max height.');
        element.style.height = MAX_HEIGHT + 'px';
      }
      //finally, if nothing else has happened. Just say you're not changing it
      else {
        console.log('max height reached. Doing nothing.');
      }
    } //otherwise no content, lower label
    else {
      console.log('\t\tNo content is in element. Making sure label is not raised.');
      add(element, 'none');
      element.style.height = "25px";
    }   
  };
  //getMaxHeight: helper function to get the maximum height the textareas can be
  const getMaxHeight = () => {
    //get state of function
    let state = 0;
    console.log('\t\tgetMaxHeight called');
    //get the height of the containing element for the form
    //get the computed style of the container
    let computedStyle = getComputedStyle(ele.container);
    //height with padding
    let containerHeight = ele.container.clientHeight; 
    //remove padding
    containerHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    //padding Top is the same as margin height of containing elements, so get that now too
    //make sure the container isn't collapsing
    if (containerHeight < 400) {
      console.log('\t\tContainer is: ' + containerHeight + 'px, and collapsing! Do nothing.');
      //set state to failed state
      state = 1;
    } else {
      let marginHeight = Math.floor(parseFloat(computedStyle.paddingTop));
      console.log('\t\t\tmargin is: ' + marginHeight);
      console.log('\t\t\tCalculating container height: ' + containerHeight);
      let row0 = ele.rows[0].getBoundingClientRect().height;
      console.log('\t\t\tCalculating name row height: ' + row0);
      let row1 = ele.rows[1].getBoundingClientRect().height;
      console.log('\t\t\tCalculating phone row height: ' + row1);
      let row4 = ele.rows[4].getBoundingClientRect().height;
      console.log('\t\t\tCalculating status row height: ' + row4);
      MAX_HEIGHT = Math.floor((containerHeight - (row0 + row1 + row4 + (marginHeight * 4))) / 2);
      console.log('Max height is: ' + MAX_HEIGHT);
    }
    return state;
  };
  //formSubmit: submits the form to the specified url
  const formSubmit = (uri, formString) => {
    console.log('Generating response');
    var flag = false,
        response = {};
    switch (formString) {
      case 'new_ticket':
        response = makeResponse('new_ticket');
    
        clearForm('new_ticket');
        break;
      case 'client':
        //if toggle is checked, we're dealing with personnel form
        if (ele.smAddPage.toggle.checked) {
          //ensure fields are filled out correctly
          flag = formValidate('personnel');
          //if they are
          if (flag) {
            response = makeResponse('personnel');

          }
        } else { //toggle is unchecked, dealing with client form
          a
        }
        break;
    }
    console.log('sending: ');
    console.log(response);
    console.log('to: ' + uri);
  };
  //formValidate: ensures all form elements are ready to send
  const formValidate = () => {

  };
  //makeResponse: generates JSON from form to send to server
  const makeResponse = (formString) => {
    let obj = {};
    switch (formString) {
      case 'new_ticket':
        obj.name = ele.name.value;
        obj.agency = ele.agency.value;
        obj.phone = ele.phone.value;
        obj.email = ele.email.value;
        obj.problem = ele.problem.value;
        obj.problemTimes = ele.problemTimer;
        obj.resolution = ele.resolution.value;
        obj.resolveTimes = ele.resolveTimer;
        obj.status = ele.status.value;
        break;
    }
    return obj;
  };
  //clearForm: removes all values from form
  const clearForm = (formString) => {
    switch (formString) {
      case 'new_ticket':
        clearField(ele.name);
        clearField(ele.agency);
        clearField(ele.phone);
        clearField(ele.email);
        clearField(ele.problem);
        resize(ele.problem);
        clearField(ele.resolution);
        resize(ele.resolution);
        clearField(ele.status);
        break;
    }
  };
  //clearField: removes all value from input
  const clearField = (element) => {
    add(element, 'none');
    switch (element.tagName) {
      case "INPUT":
      case "TEXTAREA":
        element.value = '';
        break;
      case "SELECT":
        element.value = '$';
        break;
    }
  };
  //addTimeStamp: generates a timestamp for time sensitive fields
  const addTimeStamp = (array, element) => {
    let now = new Date();
    array.push([now, element.value]);
  };

  return {
    run: init
  }
};

//get what page I'm on
let page = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
console.log(page);
console.log(typeof(page));
//then load the correct form script
switch (page) {
  case 'ticketManager':
    const form = Form();
    form.run('new_ticket');
    break;
  case 'clients':
    const addClientForm = Form();
    addClientForm.run('addClientForm');
}
//let's me know script is loaded
console.log('Form component is loaded.');
