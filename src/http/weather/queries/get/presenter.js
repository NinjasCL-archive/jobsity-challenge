export default ({ json }) => {
  return {
    main: json.weather[0].main,
    icon: json.weather[0].icon,
    name: json.name,
    temp: json.main.temp,
    isDefault: false,
  };
};
