//Form primitive
const Form = () => {
  //private variables for the instance
  const ele = {}; //stores the elements of the form
  var MAX_HEIGHT = 0; //sets maximum height a textarea can be

  //main function calls for a form
  //init: creates form instance
  const init = (formToStart) => {
    //collect elements and store in ele variable
    getEles(formToStart);

    //add event listeners, depending on the form loaded
    switch(formToStart) {
      case 'ticketManager':
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
        //add a listener for button click if clicked, or pressed enter
        ele.submit.addEventListener('click', () => { formSubmit('/new_ticket'); });
        ele.submit.addEventListener('onkeydown', (event) => { 
          if (event.keyCode === 13) { formSubmit('/new_ticket'); }
        });

        //change MAX_HEIGHT based on screen size
        //set it initally after a slight delay for animation
        setTimeout(() => { getMaxHeight(); }, 1000);
        //then listen for the screen to resize to calculate it again
        window.addEventListener('resize', () => {
          getMaxHeight();
          resize(ele.problem, ele.lblProblem);
          resize(ele.resolution, ele.lblResolution);
        });
        break;
      case 'clients':
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

  //formSubmit: submits form to the specified url
  const formSubmit = (uri, formString) => {};

  //helper function calls for a form
  //getEles: gets the elements for the form from the page and stores in ele
  const getEles = (formString) => {
    switch (formString) {
      case 'ticketManager':
        //container gets the .new_ticket div, aka the form
        ele.container     = document.querySelector('.new_ticket');
        //get all the elements in the form with a .row class (used in resizing textareas)
        ele.rows          = ele.container.querySelectorAll('.row');
        //the following are the form fields, and their matching labels/tooltips
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
        //the submit button for the form
        ele.submit        = document.getElementById('submit');
        break;
      case 'clients':
        //creates a sub-object in ele for the toggle element
        ele.smAddPage = {};
          //this is the toggle itself
          ele.smAddPage.toggle    = document.querySelector('.checkbox');
          //this is the client form container
          ele.smAddPage.addClient = document.getElementById('addClient');
          //this is the personnel form container
          ele.smAddPage.addPerson = document.getElementById('addPersonnel');

        //this is the client form object
        ele.addClientForm = {};
          //all the form fields for a client, with matching labels
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
          //the add a client form button
          ele.addClientForm.submit   =  document.getElementById('addClientSubmit');

        //this is the personnel form object
        ele.addPersonnelForm = {};
          //this is the name sub-form object, with its form fields and labels
          ele.addPersonnelForm.name      = {};
            ele.addPersonnelForm.name.first    = document.getElementById('firstNameField');
            ele.addPersonnelForm.name.firstLbl = ele.addPersonnelForm.name.first.labels[0];
            ele.addPersonnelForm.name.last     = document.getElementById('lastNameField');
            ele.addPersonnelForm.name.lastLbl  = ele.addPersonnelForm.name.last.labels[0];
          //this is the organization sub-form object, with its form fields and labels
          ele.addPersonnelForm.org       = {};
            ele.addPersonnelForm.org.client        = document.getElementById('clientField');
            ele.addPersonnelForm.org.clientLbl     = ele.addPersonnelForm.org.client.labels[0];
            ele.addPersonnelForm.org.position      = document.getElementById('positionField');
            ele.addPersonnelForm.org.positionLbl   = ele.addPersonnelForm.org.position.labels[0];
            ele.addPersonnelForm.org.department    = document.getElementById('deptField');
            ele.addPersonnelForm.org.departmentLbl = ele.addPersonnelForm.org.department.labels[0];
          //this is the phone sub-form object, with its form fields and labels
          ele.addPersonnelForm.phone     = {};
            ele.addPersonnelForm.phone.type         = document.getElementById('phoneTypeField');
            ele.addPersonnelForm.phone.typeLbl      = ele.addPersonnelForm.phone.type.labels[0];
            ele.addPersonnelForm.phone.number       = document.getElementById('phoneField');
            ele.addPersonnelForm.phone.numberLbl    = ele.addPersonnelForm.phone.number.labels[0];
            ele.addPersonnelForm.phone.extension    = document.getElementById('extensionField');
            ele.addPersonnelForm.phone.extensionLbl = ele.addPersonnelForm.phone.extension.labels[0];
          //these are the email form field element and its label
          ele.addPersonnelForm.email     = document.getElementById('emailField');
          ele.addPersonnelForm.emailLbl  = ele.addPersonnelForm.email.labels[0];
          //the add a person form button
          ele.addPersonnelForm.submit    = document.getElementById('addPersonSubmit');
        break;
    }
  };

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

  //the public variables and what internal variables they map to are returned
  return {
    run: init
  }
};

//figure out what kind of form I need
//get what page the user is on
let page = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);

//create a form instance, and run the logic for the form based on the page
const form = Form();
form.run(page);

//log to the console that this script loaded correctly
console.log('Form component is loaded.');