export const dateFormate = (date) => {
  const dateObj = new Date(date);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const checkPermission = (value, viewIndex) => {
  if (value && typeof value == "number" && value > 0) {
    const permissions = Number(value)
      .toString(2)
      .split("")
      .reverse()
      .map((item) => item === "1");
    Object.keys(viewIndex).forEach(function (key, value) {
      if (permissions.length > value) {
        viewIndex[key] = permissions[value];
      } else {
        viewIndex[key] = false;
      }
    });
    return viewIndex;
  } else {
    return false;
  }
};

export const binaryToNumber = (value) => {
  if (value) {
    const binaryToNumber = parseInt(value, 2);
    return binaryToNumber;
  } else {
    return 0;
  }
};

export const permissionCount = (value) => {
  if (value && typeof value == "number" && value > 0) {
    const permissions = Number(value).toString(2).split("");
    const total = permissions.length;
    const count = permissions.filter((item) => item === "1").length;
    return { count, total };
  }
  return { count: 0, total: 0 };
};

export const isValidColor = (input) => {
  try {
    const namedColors = [
      "black",
      "silver",
      "gray",
      "white",
      "maroon",
      "red",
      "purple",
      "fuchsia",
      "green",
      "lime",
      "olive",
      "yellow",
      "navy",
      "blue",
      "teal",
      "aqua",
      // Add more color names here
    ];

    // Case-insensitive match against the list of named colors
    const colorRegex = new RegExp(`^(${namedColors.join("|")})$`, "i");
    // let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    let regex = new RegExp(
      /^(#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d),(0|100|\d{1,2})%,(0|100|\d{1,2})%,(0?\.\d|1(\.0)?)\))$/
    );
    return regex.test(input) || colorRegex.test(input);
  } catch (error) {
    return false;
  }
};

export const handleStringArray = (state, setState, e, index) => {
  // Example: {categories : ["_id"]}
  if (index === undefined) {
    if (!state[name] || state[name].length === 0) {
      setState({ ...state, [name]: [""] });
      return;
    }
    setState({ ...state, [name]: [...state[name], ""] });
  }
  const { name, value } = e.target;
  setState({
    ...state,
    [name]: [
      ...state[name].slice(0, index),
      value,
      ...state[name].slice(index + 1),
    ],
  });
};

export const handleObjectArray = (state, setState, key, e, index) => {
  // Example: state = {custom_text: [{textField: "", textLimit: ""}, {textField: "", textLimit: ""}]}
  if (index === undefined) {
    if (!state[key] || state[key].length === 0) {
      setState(prevState => ({ ...prevState, [key]: [{}] }));
      return;
    }
    setState(prevState => ({ ...prevState, [key]: [...prevState[key], {}] }));
  } else {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setState(prevState => ({
        ...prevState,
        [key]: [
          ...prevState[key].slice(0, index),
          { ...prevState[key][index], [name]: checked },
          ...prevState[key].slice(index + 1),
        ],
      }));
      return;
    }
    setState(prevState => ({
      ...prevState,
      [key]: [
        ...prevState[key].slice(0, index),
        { ...prevState[key][index], [name]: value },
        ...prevState[key].slice(index + 1),
      ],
    }));
    return;
  }
};

export const calculatePrice = ( priceperunit, variantsDetails, index, discountTypeRs, discountperunit ) => {
  const priceDifference = variantsDetails[index] ? variantsDetails[index].priceDifference : 0;
  return (priceperunit && variantsDetails[index].priceDifference
    ? discountperunit
      ? discountTypeRs
        ? Number(priceperunit) -
          discountperunit +
          Number(priceDifference)
        : Number(priceperunit) -
          (discountperunit / 100) * priceperunit +
          Number(priceDifference) -
          (discountperunit / 100) *
            priceDifference
      : Number(priceperunit) +
        Number(priceDifference)
    : priceperunit
    ? Number(
        discountTypeRs
          ? Number(priceperunit) -
              (Number(discountperunit) || 0)
          : Number(priceperunit) -
              ((Number(discountperunit) || 0) / 100) *
                Number(priceperunit)
      )
    : priceDifference
    ? Number(priceDifference)
    : 0.0).toFixed(2);
}