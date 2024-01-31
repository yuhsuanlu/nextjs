const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Poliwhirl P',
    email: 'poliwhirl@pokemon.com',
    image_url: '/customers/poliwhirl.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Nidoqueen N',
    email: 'nidoqueen@pokemon.com',
    image_url: '/customers/nidoqueen.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Clefairy C',
    email: 'clefairy@pokemon.com',
    image_url: '/customers/clefairy.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Vulpix V',
    email: 'vulpix@pokemon.com',
    image_url: '/customers/vulpix.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Ninetales N',
    email: 'ninetales@pokemon.com',
    image_url: '/customers/ninetales.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Jigglypuff J',
    email: 'jigglypuff@pokemon.com',
    image_url: '/customers/jigglypuff.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Oddish O',
    email: 'oddish@pokemon.com',
    image_url: '/customers/oddish.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Gloom G',
    email: 'gloom@pokemon.com',
    image_url: '/customers/gloom.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Paras P',
    email: 'paras@pokemon.com',
    image_url: '/customers/paras.png',
  },
  {
    id: 'b371ff55-dcfa-4f78-b0bc-a332bda783e6',
    name: 'Venomoth V',
    email: 'venomoth@pokemon.com',
    image_url: '/customers/venomoth.png',
  },
  {
    id: 'e4ce84d3-5732-4421-ad30-b20d03f24c4b',
    name: 'Charmander C',
    email: 'charmander@pokemon.com',
    image_url: '/customers/charmander.png',
  },
  {
    id: 'cb473567-ff57-4f87-9254-370f5c3f6650',
    name: 'Pikachu P',
    email: 'pikachu@pokemon.com',
    image_url: '/customers/pikachu.png',
  },
  {
    id: '707b51fd-4b1b-450f-ba8b-87f29b0b9623',
    name: 'Raichu R',
    email: 'raichu@pokemon.com',
    image_url: '/customers/raichu.png',
  },
  {
    id: '2c822ee3-c2f3-48d4-a7e6-361977cba178',
    name: 'Wigglytuff W',
    email: 'wigglytuff@pokemon.com',
    image_url: '/customers/wigglytuff.png',
  },
  {
    id: 'd403b8bc-9d48-42d6-9780-0d0649ee7532',
    name: 'Psyduck P',
    email: 'psyduck@pokemon.com',
    image_url: '/customers/psyduck.png',
  },
  {
    id: '8b3380f6-27ce-4984-9ca1-665f7983540f',
    name: 'Ponyta P',
    email: 'ponyta@pokemon.com',
    image_url: '/customers/ponyta.png',
  },
  {
    id: 'dcf42feb-c885-4030-a421-32484bfdba8d',
    name: 'Slowpoke S',
    email: 'slowpoke@pokemon.com',
    image_url: '/customers/slowpoke.png',
  },
  {
    id: '2baa13f2-7740-482f-af95-76aae356d469',
    name: 'Seel S',
    email: 'seel@pokemon.com',
    image_url: '/customers/seel.png',
  },
  {
    id: 'dbe108ef-dce2-4877-81b5-a970de9795c7',
    name: 'Eevee E',
    email: 'eevee@pokemon.com',
    image_url: '/customers/eevee.png',
  },
  {
    id: '66a6373f-ea40-424e-8300-726e9e269ba7',
    name: 'Ditto D',
    email: 'ditto@pokemon.com',
    image_url: '/customers/ditto.png',
  },
  {
    id: 'b1afdab8-030e-4f55-9a9a-282ebdd26b99',
    name: 'Flareon F',
    email: 'flareon@pokemon.com',
    image_url: '/customers/flareon.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
};
