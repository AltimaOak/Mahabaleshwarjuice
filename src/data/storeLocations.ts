export interface StoreLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  pincode: string;
  address: string;
  landmark: string;
  timings: string;
  phone: string;
  mapsUrl: string;
}

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'thane-kolbad',
    name: 'Kolbad / Khopat (Thane West)',
    area: 'Kolbad / Khopat, Uthalsar',
    city: 'Thane West',
    pincode: '400601',
    address: 'Shop No 5, Olivia Prime, Kolbad Rd, near Vikas Complex, Hardas Nagar, Uthalsar, Thane West, Thane, Maharashtra 400601',
    landmark: 'Near Vikas Complex, Hardas Nagar',
    timings: '11:00 AM - 12:00 AM (Daily)',
    phone: '9082175829',
    mapsUrl: 'https://www.google.com/maps/place/Mahabaleshwar+Juice+Centre/@19.206597,72.9738775,229m/data=!3m2!1e3!5s0x3be7b93f2f37e06d:0x5c8e564b074ca22!4m10!1m2!2m1!1sShop+No+5+Olivia+Prime+Kolbad+Rd+near+Vikas+Complex+Hardas+Nagar+Uthalsar+Thane+West+Thane+Maharashtra+400601!3m6!1s0x3be7b93ea1e67f5b:0xd672a005cb31879a!8m2!3d19.20687!4d72.9749468!15sCm1TaG9wIE5vIDUgT2xpdmlhIFByaW1lIEtvbGJhZCBSZCBuZWFyIFZpa2FzIENvbXBsZXggSGFyZGFzIE5hZ2FyIFV0aGFsc2FyIFRoYW5lIFdlc3QgVGhhbmUgTWFoYXJhc2h0cmEgNDAwNjAxWm8ibXNob3Agbm8gNSBvbGl2aWEgcHJpbWUga29sYmFkIHJkIG5lYXIgdmlrYXMgY29tcGxleCBoYXJkYXMgbmFnYXIgdXRoYWxzYXIgdGhhbmUgd2VzdCB0aGFuZSBtYWhhcmFzaHRyYSA0MDA2MDGSAQpqdWljZV9zaG9w4AEA!16s%2Fg%2F11gf00c39p?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'thane-vasant-vihar',
    name: 'Vasant Vihar (Thane West)',
    area: 'Vasant Vihar',
    city: 'Thane West',
    pincode: '400610',
    address: 'Shop No.17, Mahabaleshwar Juice Center, near old Loak hospital, Vasant Vihar, Thane West, Thane, Maharashtra 400610',
    landmark: 'Near Old Loak Hospital',
    timings: '11:00 AM - 12:00 AM (Daily)',
    phone: '9967997522',
    mapsUrl: 'https://www.google.com/maps/place/Mahabaleshwar+Juice+Center/@19.2219592,72.9643718,1315m/data=!3m1!1e3!4m10!1m2!2m1!1sShop+No+17+Mahabaleshwar+Juice+Center+near+old+Loak+hospital+Vasant+Vihar+Thane+West+Maharashtra+400610!3m6!1s0x3be7b9a4e9f1356d:0x5581e263e92301e1!8m2!3d19.2208675!4d72.9704431!15sCmZTaG9wIE5vIDE3IE1haGFiYWxlc2h3YXIgSnVpY2UgQ2VudGVyIG5lYXIgb2xkIExvayBob3NwaXRhbCBWYXNhbnQgVmloYXIgVGhhbmUgV2VzdCBNYWhhcmFzaHRyYSA0MDA2MTBaaCJmc2hvcCBubyAxNyBtYWhhYmFsZXNod2FyIGp1aWNlIGNlbnRlciBuZWFyIG9sZCBsb2sgaG9zcGl0YWwgdmFzYW50IHZpaGFyIHRoYW5lIHdlc3QgbWFoYXJhc2h0cmEgNDAwNjEwkgEKanVpY2Vfc2hvcOABAA!16s%2Fg%2F11vs05_bwq?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'mumbai-mulund',
    name: 'Mulund West (Mumbai)',
    area: 'Mulund West',
    city: 'Mumbai',
    pincode: '400080',
    address: 'Shop no 6, Prem Nagar Legacy, Pandit Jawaharlal Nehru Rd, near Apana Bazar, Mulund West, Mumbai, Maharashtra 400080',
    landmark: 'Near Apana Bazar, Nehru Road',
    timings: '11:00 AM - 12:00 AM (Daily)',
    phone: '7718001047',
    mapsUrl: 'https://www.google.com/maps/place/Mahabaleshwar+Juice+Centre/@19.1685302,72.9520451,621m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3be7b97b66d91553:0x5b05352b5bec33e3!2sMahabaleshwar+Juice+Centre!8m2!3d19.1685302!4d72.9520451!16s%2Fg%2F11x_spdlmq!3m5!1s0x3be7b97b66d91553:0x5b05352b5bec33e3!8m2!3d19.1685302!4d72.9520451!16s%2Fg%2F11x_spdlmq?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D',
  },
];
