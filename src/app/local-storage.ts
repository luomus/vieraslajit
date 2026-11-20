
export const getLanguageFromLocalStorage = () => {
  return window.localStorage.getItem("vrs-lang");
}

export const setLanguageInLocalStorage = (language: string) => {
  window.localStorage.setItem("vrs-lang", language);
}

export const getPersonTokenFromLocalStorage = () => {
  return window.localStorage.getItem("token");
}

export const setPersonTokenInLocalStorage = (token: string) => {
  window.localStorage.setItem("token", token);
}
