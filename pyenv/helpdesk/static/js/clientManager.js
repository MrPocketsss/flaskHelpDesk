const ClientManager = () => {
  //ele stores the elements on the client page
  const ele = {};

  //getELe: gathers the elements on the page and stores them in the ele object
  const getEles = () => {
    
  };

  //init: starts the client Manager
  const init = () => {
    getEles();
  };

  return {
    run: init()
  }
};

const clientManager = ClientManager();
clientManager.run();
console.log('Client manager is running.');