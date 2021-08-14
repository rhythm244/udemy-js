class DomHelper {

  static clearEventListeners(element){
    const cloneElement = element.cloneNode(true)
    element.replaceWith(cloneElement)
    return cloneElement;
  }
  
  static moveElement(elementId, newDestinationSelector){
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector)
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false ) {
    if ( hostElementId ) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = documnet.body;
    }

    this.insertBefore = insertBefore;
  }
  
  detach () {
    if (this.element){
      this.element.remove();
    }
  }
  
  attach() {
    // document.body.append(this.element)
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforend",
      this.element
    );
  }
}

class Tooltip extends Component{
  constructor(closeNotifyFn){
    super('active-projects', true);
    this.cloneNotifyHandler = closeNotifyFn;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.cloneNotifyHandler(); // มันคือ anonymous function บน line 81 ที่ถูกส่งมาจาก new Tooltip 
  }

  create() {
    console.log("Tooltip....")
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = 'DUMMY';
    tooltipElement.addEventListener('click', this.closeTooltip)
    this.element = tooltipElement;
    
  }
  
}

class ProjectItem {
  hasActiveTooltip = false;
  
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip){
      return;
    }
    console.log("showMoreInfoHandler....")
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler)
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DomHelper.clearEventListeners(switchBtn)
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate'
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
  }

  update(updateProjectListFn, type) {
    this.updateProjectListsHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DomHelper.moveElement(project.id, `#${this.type}-projects ul`)
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    //ล่างนี่ เป็นการ setup
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
