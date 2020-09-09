export const infrastructureMocks = {
  infrastructureCopy: { success: true },
  infrastructureUpdate: { success: true },
  infrastructureRemove: { success: true },
  infrastructureList: [
    {
      id: "11599639112450",
      type: "Виртуальная машина",
      name: "merchant.corp.tander.ru",
      environment: "Продуктивная",
      role: "Сервер БД",
      os: "CentOS",
      subd: "",
      cpu: "4",
      cpuGhz: "3",
      ram: "32",
      shdVolume: "22",
      diskVolume: "250",
      diskVolumeFull: "272",
      shdRequest: "Нет",
      iops: "",
      blocksize: "",
      latency: "",
      backup: "Да",
      backupClass: "",
      backupFrequency: "",
      backupDepth: "",
      diskDistribution: "",
      note: "",
    },
    {
      id: "1599639112451",
      type: "Физический сервер",
      name: "merchant.corp.tander.ru",
      environment: "Продуктивная",
      role: "Сервер приложений",
      os: "CentOS",
      subd: "",
      cpu: "4",
      cpuGhz: "3",
      ram: "32",
      shdVolume: "22",
      diskVolume: "250",
      diskVolumeFull: "272",
      shdRequest: "Нет",
      iops: "",
      blocksize: "",
      latency: "",
      backup: "Нет",
      backupClass: "",
      backupFrequency: "",
      backupDepth: "",
      diskDistribution: "",
      note: "",
    },
  ],
};

export function infrastructureMethods({
  url,
  data,
  method,
  id,
  mocks,
  resolve,
  reject,
}) {
  switch (`${url}|${method}`) {
    // Infrastructure GET
    case "infrastructure|GET":
      resolve(mocks.infrastructureList);
      console.log(`response ${method} - ${url}: `, mocks.infrastructureList);
      break;
    // Infrastructure ADD
    case "infrastructure/add|POST":
      resolve(data);
      console.log(`response ${method} - ${url}: `, data);
      break;
    // Infrastructure COPY
    case `infrastructure/copy/${id}|POST`:
      mocks.infrastructureList.forEach((obj) => {
        if (Object.values(obj)[0] === id) {
          let newObj = Object.assign({}, obj);
          newObj.id = new Date().getTime();
          mocks.infrastructureList.push(newObj);
          resolve(mocks.infrastructureCopy);
          console.log(
            `response ${method} - ${url}: `,
            mocks.infrastructureCopy
          );
        }
      });
      break;
    // Infrastructure DELETE
    case `infrastructure/${id}|DELETE`:
      mocks.infrastructureList.forEach((obj) => {
        if (Object.values(obj)[0] === id) {
          let index = mocks.infrastructureList.indexOf(obj);
          mocks.infrastructureList.splice(index, 1);
          resolve(mocks.infrastructureRemove);
          console.log(
            `response ${method} - ${url}: `,
            mocks.infrastructureRemove
          );
        }
      });

      break;
    // Infrastructure GET BY ID
    case `infrastructure/${id}|GET`:
      mocks.infrastructureList.forEach((obj) => {
        if (Object.values(obj)[0] === id) {
          resolve(obj);
          console.log(`response ${method} - ${url}: `, obj);
        }
      });
      break;
    // Infrastructure UPDATE
    case `infrastructure/${id}|PUT`:
      mocks.infrastructureList.forEach((obj) => {
        if (Object.values(obj)[0] === id) {
          for (var key in data) obj[key] = data[key];
          resolve(mocks.infrastructureUpdate);
          console.log(
            `response ${method} - ${url}: `,
            mocks.infrastructureUpdate
          );
        }
      });
      break;
  }
}
