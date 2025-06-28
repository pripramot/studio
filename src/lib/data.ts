export type Vehicle = {
  name: string;
  image: string;
  dataAiHint: string;
  price: number;
  type: 'Sedan' | 'Hatchback' | 'SUV' | 'Truck';
  seats: number;
  rating: number;
  reviews: number;
  useCases: string;
};

export const vehicles: Vehicle[] = [
  {
    name: 'Honda City',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern sedan',
    price: 856,
    type: 'Sedan',
    seats: 5,
    rating: 4.7,
    reviews: 142,
    useCases: 'เหมาะสำหรับการขับขี่ในเมืองและการเดินทางธุรกิจ ประหยัดน้ำมันเป็นเลิศ',
  },
  {
    name: 'Toyota Yaris Ativ',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'white sedan',
    price: 749,
    type: 'Sedan',
    seats: 5,
    rating: 4.6,
    reviews: 130,
    useCases: 'รถซีดานที่เชื่อถือได้และสะดวกสบายสำหรับครอบครัวและการเดินทางไกล',
  },
  {
    name: 'Nissan Almera',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'black sedan sport',
    price: 749,
    type: 'Sedan',
    seats: 5,
    rating: 4.4,
    reviews: 95,
    useCases: 'ซีดานที่มีสไตล์พร้อมความสปอร์ต เหมาะสำหรับการสร้างความประทับใจ',
  },
  {
    name: 'Suzuki Swift',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'red hatchback',
    price: 642,
    type: 'Hatchback',
    seats: 5,
    rating: 4.3,
    reviews: 88,
    useCases: 'ตัวเลือกที่ประหยัดและคล่องตัวสำหรับการเดินทางในเมือง',
  },
  {
    name: 'Ford Ranger Raptor',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'blue truck offroad',
    price: 1800,
    type: 'Truck',
    seats: 5,
    rating: 4.9,
    reviews: 210,
    useCases: 'สำหรับนักผจญภัยที่ต้องการสำรวจเส้นทางออฟโรด',
  },
  {
    name: 'ISUZU D-MAX CAB',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'silver truck pickup',
    price: 856,
    type: 'Truck',
    seats: 4,
    rating: 4.6,
    reviews: 180,
    useCases: 'รถกระบะที่แข็งแกร่งและเชื่อถือได้สำหรับงานบรรทุกหนักและการสำรวจชนบท',
  },
  {
    name: 'Toyota Veloz',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'maroon suv family',
    price: 1070,
    type: 'SUV',
    seats: 7,
    rating: 4.7,
    reviews: 155,
    useCases: 'SUV 7 ที่นั่งที่ทันสมัย เหมาะสำหรับครอบครัวใหญ่และการเดินทางเป็นกลุ่ม',
  },
  {
    name: 'Pajero Sport Elite edition',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'white suv luxury',
    price: 1498,
    type: 'SUV',
    seats: 7,
    rating: 4.8,
    reviews: 195,
    useCases: 'การผสมผสานระหว่างความหรูหราและสมรรถนะเพื่อประสบการณ์การเดินทางระดับพรีเมียม',
  },
  {
    name: 'Mitsubishi Xpander Cross',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'orange suv compact',
    price: 1284,
    type: 'SUV',
    seats: 7,
    rating: 4.6,
    reviews: 140,
    useCases: 'SUV สไตล์ MPV ที่กว้างขวางและยืดหยุ่นสำหรับครอบครัวพร้อมสัมภาระมากมาย',
  },
  {
    name: 'Isuzu MU-X',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'black suv rugged',
    price: 1498,
    type: 'SUV',
    seats: 7,
    rating: 4.7,
    reviews: 170,
    useCases: 'SUV ที่แข็งแกร่งและมีความสามารถ ออกแบบมาเพื่อความสะดวกสบายในการเดินทางไกล',
  },
];
