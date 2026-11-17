
export const getLanguage = () => {
  return window.localStorage.getItem("vrs-lang");
}

export const setLanguage = (language: string) => {
  window.localStorage.setItem("vrs-lang", language);
}

export const getPersonToken = () => {
  return window.localStorage.getItem("token");
}

export const setPersonToken = (token: string) => {
  window.localStorage.setItem("token", token);
}
