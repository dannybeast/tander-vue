var smartgrid = require("smart-grid");

var settings = {
  outputStyle: "scss",
  columns: 12,
  offset: "30px",
  mobileFirst: false,
  container: {
    maxWidth: "1200px",
    fields: "30px",
  },
  breakPoints: {
    xxl: {
      width: "1600px",
    },
    xl: {
      width: "1280px",
    },
    lg: {
      width: "1100px",
    },
    md: {
      width: "992px",
    },
    sm: {
      width: "767px",
      fields: "15px",
    },
    xs: {
      width: "360px",
    },
  },
};

smartgrid("./src/assets/scss", settings);
