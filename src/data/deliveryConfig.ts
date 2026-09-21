export const BRANCH_DELIVERY_LINKS = {
  vasantVihar: {
    name: 'Vasant Vihar',
    zomato: 'https://www.zomato.com/mumbai/mahabaleshwar-juice-centre-vasant-vihar-thane-west-thane/order',
    swiggy: 'https://www.swiggy.com/city/mumbai/mahableshwar-juice-center-gladys-alwares-rd-thane-rest871087',
  },
  kolbad: {
    name: 'Kolbad / Khopat',
    zomato: 'https://www.zomato.com/mumbai/mahabaleshwar-juice-centre-1-khopat-thane-west-thane/order',
    swiggy: 'https://www.swiggy.com/city/mumbai/mahabaleshwar-juice-centre-thane-west-rest73341',
  },
  mulund: {
    name: 'Mulund West',
    zomato: 'https://www.zomato.com/mumbai/mahabaleshwar-juice-centre-mulund-west/order',
    swiggy: 'https://www.swiggy.com/city/mumbai/mahabaleshwar-juice-centre-mulund-rest1268672',
  },
};

export const DELIVERY_LINKS = {
  swiggy: BRANCH_DELIVERY_LINKS.vasantVihar.swiggy,
  zomato: BRANCH_DELIVERY_LINKS.vasantVihar.zomato,
};

export const PRICING_DEMAND_NOTE =
  'Prices on Swiggy and Zomato may vary based on platform charges and demand.';
