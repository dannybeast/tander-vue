// Тест
const mocks = {
  auth: { token: "This-is-a-mocked-token" },
  infrastructureCopy: { success: true },
  infrastructureRemove: { success: true },
  infrastructureList: [
    {
      id: "1",
      type: "Виртуальная машина",
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
      backup: "",
      backupClass: "",
      backupFrequency: "",
      backupDepth: "",
      diskDistribution: "",
      note: "",
    },
    {
      id: "2",
      type: "Виртуальная машина",
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
      backup: "",
      backupClass: "",
      backupFrequency: "",
      backupDepth: "",
      diskDistribution: "",
      note: "",
    },
  ],
};

const apiCall = ({ url, data, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        switch (url) {
          //
          case "user":
            resolve(data);
            console.log("response user: ", data);
            break;
          //
          case "infrastructure":
            resolve(mocks.infrastructureList);
            console.log("response get: ", mocks.infrastructureList);
            break;
          //
          case "infrastructure/add":
            resolve(data);
            console.log("response add: ", data);
            break;
          //
          case "infrastructure/copy":
            resolve(mocks.infrastructureCopy);
            console.log("response copy: ", mocks.infrastructureCopy);
            break;
          //
          case "infrastructure/remove":
            resolve(mocks.infrastructureRemove);
            console.log("response remove: ", mocks.infrastructureRemove);
            break;
          //
          case "auth":
            resolve(mocks.auth);
            console.log("response auth: ", mocks.auth);
            break;
        }
      } catch (err) {
        reject(new Error(err));
      }
    }, 100);
  });

export default apiCall;
