export function serverAuth() {
  const user = localStorage.getItem('user');
  const serverNum = Number(localStorage.getItem('passcom-server'));
  if (user) {
    if (serverNum === 1) return import.meta.env.VITE_BASE_API_s1;
    if (serverNum === 2) return import.meta.env.VITE_BASE_API_s2;
    if (serverNum === 3) return import.meta.env.VITE_BASE_API_s3;
  }
  return import.meta.env.VITE_BASE_API_s1;
}

export function serverAuthLogin(num: number) {
  if (num === 1) return import.meta.env.VITE_BASE_API_s1;
  if (num === 2) return import.meta.env.VITE_BASE_API_s2;
  if (num === 3) return import.meta.env.VITE_BASE_API_s3;
  
  return import.meta.env.VITE_BASE_API_s1;
}

export function getToken() {
  const token = localStorage.getItem('passcom-token');
  if (token) {
    return token
  }
  return ''
}

export function getUser() {
  const token = localStorage.getItem('user');
  if (token) {
    return token
  }
  return ''
}

type SeatStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';

type Seat = {
  status: SeatStatus;
  number: number;
};


// Função para verificar o status dos assentos
export function checkSeatStatus(edges: Edge[]): Seat[] {
  const seatMap: Map<number, Set<SeatStatus>> = new Map();

  // Agrupando status dos assentos por número e convertendo statusConfirmation
  edges.forEach(edge => {
    edge.accents.forEach(accent => {
      const status: SeatStatus = 
        accent.statusConfirmation === 'SOLD' || accent.statusConfirmation === 'RESERVED'
          ? accent.statusConfirmation
          : 'AVAILABLE';

      if (!seatMap.has(accent.number)) {
        seatMap.set(accent.number, new Set());
      }
      seatMap.get(accent.number)!.add(status);
    });
  });

  // Determinando o status final do assento
  const seats: Seat[] = [];
  seatMap.forEach((statuses, number) => {
    let finalStatus: SeatStatus;

    if (statuses.has('SOLD')) {
      finalStatus = 'SOLD';
    } else if (statuses.has('RESERVED')) {
      finalStatus = 'RESERVED';
    } else {
      finalStatus = 'AVAILABLE';
    }

    seats.push({ number, status: finalStatus });
  });

  return seats;
}

type Edge = {
  server: string;
  travelId: string;
  accents: {
    id: string;
    number: number;
    statusConfirmation: string;
    expire: string;
    user: {
      id: string;
      email: string;
      name: string;
      password: string;
      serverOne: boolean;
      serverTwo: boolean;
    };
  }[];
};

type Data = {
  startCity: string;
  endCity: string;
  edges: Edge[];
};

export const extractTravelInfo = (data: Data) => {
  return data.edges.map(edge => ({
    travelId: edge.travelId,
    path: edge.server
  }));
}
