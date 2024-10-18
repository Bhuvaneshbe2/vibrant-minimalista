interface ContactProperty {
  [key: string]: string[];
}

interface ContactAddress {
  streetAddress?: string;
  locality?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  formatted?: string;
}

interface ContactName {
  familyName?: string;
  givenName?: string;
  middleName?: string;
  honorificPrefix?: string;
  honorificSuffix?: string;
}

interface ContactIcon {
  url?: string;
}

interface Contact {
  address?: ContactAddress[];
  email?: string[];
  icon?: ContactIcon[];
  name?: ContactName[];
  tel?: string[];
}

interface ContactsManager {
  select: (properties: string[], options?: object) => Promise<Contact[]>;
}

interface Navigator {
  contacts?: ContactsManager;
}