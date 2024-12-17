
export type LoginResponse = {
  name: string,
  id: string,
  token: string,
  email: string,
}

// Define a interface para o usuário
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  serverOne: boolean;
  serverTwo: boolean;
}

// Define a interface para os acentos
export interface Accent {
  id: string;
  number: number;
  statusConfirmation: string; // Por exemplo, "SOLD"
  expire: string; // Data no formato ISO 8601
  user: User; // Relação com o usuário
}

// Define a interface para as arestas
export interface Edge {
  server: string;
  travelId: string; // ID da viagem
  accents: Accent[]; // Lista de acentos
}

// Define a interface para a viagem
export interface Travel {
  startCity: string; // Cidade de origem
  endCity: string; // Cidade de destino
  edges: Edge[]; // Lista de arestas relacionadas
}

// Define um tipo para o array de viagens
export type TravelData = Travel[];
