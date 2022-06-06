import { stringToArray } from "./stringFormatters";

export const topologicalSort = (elementsArray) => {
  const sortedQueue = [];
  const queue = elementsArray.filter(element => element.degree === 0);
  const array = elementsArray.filter(element => element.degree !== 0);

  while(queue.length) {
    const currentNode = queue.shift();
    if(!currentNode) {
      queue.length = 0;
    } else {
      sortedQueue.push(currentNode);
      for(let i = 0, len = array.length; i < len; ++i) {
        const element = array[i];
        const elementDependsOn = stringToArray(element.dependsOn);
        const hasDependencyOnCurrentNode = elementDependsOn.find(dependency => {
          return dependency === currentNode.description;
        });
        if(hasDependencyOnCurrentNode) {
          array[i].degree--;
          if(array[i].degree === 0) {
            queue.push(array[i]);
          }
        }
      }
    }
  }

  return sortedQueue;
};
