import { AuthUser, IAnimal } from "../interfaces";

export const cardSpeciesToLowerCase = (species: string): string => {
  const splittedSpecies = species.split(" ");
  if (splittedSpecies.length > 1) {
    return splittedSpecies.join("-").toLowerCase();
  }
  return species.toLowerCase();
};

export const sortCardsAlphabetically = (cards: IAnimal[]): IAnimal[] => {
  return cards.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const capitalize = (string: string): string =>
  `${string[0].toUpperCase()}${string.substring(1).toLowerCase()}`;

export const getCurrentSection = (path: string): string =>
  ["/profile", "/campaign", "/collection", "/menu"].includes(path)
    ? capitalize(path.substring(1))
    : "";

export const getCookie = (name: string) => {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name))
    ?.substring(5);
};

export const getNewUserTemplate = (user: AuthUser) => {
  const { sub, picture, email, given_name, family_name, locale } = user;
  return {
    ...(sub ? { auth_id: sub } : {}),
    ...(picture ? { picture } : {}),
    ...(email ? { email } : {}),
    ...(locale ? { locale } : {}),
    ...(given_name ? { first_name: given_name } : {}),
    ...(family_name ? { last_name: family_name } : {}),
  };
};

export const getUtm = (search?: string) => {
  if (!search) return;
  const searchParams = new URLSearchParams(search);
  if (!searchParams.has("utm_source")) return;
  return `utm_source=${searchParams.get(
    "utm_source"
  )}&utm_medium=${searchParams.get("utm_medium")}`;
};

export const getRandomChance = (percent: number) =>
  Math.random() < percent / 100;

export const getLiveCards = (hand: IAnimal[]): IAnimal[] =>
  hand.filter((card) => card.life.current !== "DEAD");

export const getRandomFromArr = (arr: any[]) => {
  const randomIdx = Math.floor(Math.random() * arr.length);
  return arr[randomIdx];
};
