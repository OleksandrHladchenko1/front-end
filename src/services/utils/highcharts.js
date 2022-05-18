export const prepareDataForHighcharts = (array) => {
  const result = [];
  array.forEach(item => {
    const obj = result.find(o => o.id === item.id);
    if(obj) {
      obj.workload = +obj.workload + +item.workload;
    } else {
      result.push(item);
    }
  });

  return result.map(item => ({
    name: `${item.firstName} ${item.lastName} ${item.fatherName}`,
    y: Number((item.workload / 60).toFixed(1)),
    drilldown: `${item.firstName} ${item.lastName} ${item.fatherName}`,
    workerId: item.id,
  }));
};

export const prepareDrilldownData = array => {
  const result = [];
  array.forEach(item => {
    const name = `${item.firstName} ${item.lastName} ${item.fatherName}`;
    const obj = result.find(o => `${ o.name }` === name);
    if(obj) {
      obj.data.push([`${item.name}`, Number((item.workload / 60).toFixed(1))]);
    } else {
      result.push({
        name: `${item.firstName} ${item.lastName} ${item.fatherName}`,
        id: `${item.firstName} ${item.lastName} ${item.fatherName}`,
        data: [[`${item.name}`, Number((item.workload / 60).toFixed(1))]],
      });
    }
  });
  console.log(result);
  return result;
};

