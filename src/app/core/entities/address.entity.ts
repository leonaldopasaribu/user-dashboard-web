export interface AddressEntity {
  city: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  postalCode: string;
  street: string;
  suite: string;
}
