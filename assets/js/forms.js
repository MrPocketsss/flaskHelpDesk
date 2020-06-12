const Form = () => {
  //Some private variables for the instance
  const ele = {};
  // init: Creates instance of Form
  const init = () => {
    getEles();
    console.log('Form instance is running.')
    ele.name.addEventListener('input', () => { validate(ele.name, ele.lblName, 'text'); });
    ele.agency.addEventListener('input', () => { validate(ele.agency, ele.lblAgency, 'text') });
    ele.phone.addEventListener('input', () => { validate(ele.phone, ele.lblPhone, 'phone'); });
  };
  // get all the elements for the form
  const getEles = () => {
    ele.name = document.getElementById('name');
    ele.lblName = ele.name.labels[0];
    ele.agency = document.getElementById('agency');
    ele.lblAgency = ele.agency.labels[0];
    ele.phone = document.getElementById('phone');
    ele.lblPhone = ele.phone.labels[0];
    ele.email = document.getElementById('email');
    ele.lblEmail = ele.email.labels[0];
    ele.problem = document.getElementById('problem');
    ele.lblProblem = ele.problem.labels[0];
    ele.resolution = document.getElementById('resolution');
    ele.lblResolution = ele.resolution.labels[0];
    ele.status = document.getElementById('status');
    ele.lblStatus = ele.status.labels[0];
    ele.submit = document.getElementById('submit');
  };
  // validate: Runs validation code against form elements
  const validate = (element, label, typeStr) => {
    let re = '';
    let regexFlag = false;
    switch(typeStr) {
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
        //if we haven't written a full phone number
        if (element.value.length < 10) {
          //create a buffer element, holding the value of the input, but remove any non-digits
          buffer = element.value.replace(/[^0-9]/g, '');
          //if the buffer value doesn't match the input value, there are non-digits in the input
          if (buffer !== element.value) {
            //show the tooltip saying not to do that, if it isn't already showing
            if (!element.previousElementSibling.classList.contains('show')) {
              element.previousElementSibling.classList.add('show');
            }
            //set the value of the input to one with only digits
            element.value = buffer;
          }
          //the input has only digits, so hide the tooltip if it was showing
          else {
            if (element.previousElementSibling.classList.contains('show')) {
              element.previousElementSibling.classList.remove('show');
            }
          }
          //set the label above if the user clicks away
          add(element, 'filled');
        }
        //we have at least a full phone number, so validate it now
        else if (element.value.length > 9 && element.value.length < 15) {
          //the regex, and the test of the input value against the regex
          console.log('value is: ' + element.value);
          console.log('regex is set initially to: ' + regexFlag);
          re = /(^[0-9]{10}:[0-9]{3})|(^[0-9]{10})/;
          regexFlag = re.test(element.value);
          console.log('regexFlag is then set to: ' + regexFlag);
          //if we're good, display valid color
          if (regexFlag) { add(element, 'valid'); }
          //otherwise its wrong and make it red
          else { add(element, 'invalid'); }
        } else {
          add(element, 'invalid');
        }
        break;
    }
  };
  //add: helper function for modifying classes on elements
  const add = (element, classToAdd) => {
    var classArray = ['valid', 'invalid', 'filled'];
    if (classToAdd == 'none') {
      for (let i = 0; i < classArray.length; ++i) {
        element.classList.remove(classArray[i]);
      }
    } else {
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

  return {
    run: init
  }
};

const form = Form();
form.run();
console.log('Form component is loaded.')
