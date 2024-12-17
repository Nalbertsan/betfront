import axios from "axios";

const API_BASE_URL = "http://localhost:8080/blockchain";

// Tipos dos resultados de um evento
export type Outcome = Record<string, number>; // Ex: { "Cara": 12000000000000000020, "Coroa": 17000000000000000000 }

// Tipos das odds
export type Odds = Record<string, number>; // Ex: { "Cara": 2295833333333333330, "Coroa": 1620588235294117647 }

// Tipo principal do evento
export interface EventDetails {
  eventId: number;
  eventName: string;
  totalPool: bigint; // Valores grandes como bigints
  eventResult: string | null; // Pode ser nulo caso não tenha resultado
  outcomes: Outcome; // Resultados possíveis
  odds: Odds; // Odds para cada resultado
  finalized: boolean; // Status do evento
}

export const blockchainService = {
  // Consultar saldo de uma conta
  getBalance: async (address: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/balance/${address}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao obter saldo: ${error}`);
    }
  },

  // Criar um evento de apostas
  createBettingEvent: async (bettingEventDTO: {
    contractAddress: string;
    privateKey: string;
    eventName: string;
    outcomes: string[];
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/create-betting-event`,
        bettingEventDTO
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao criar evento de apostas: ${error}`);
    }
  },

  // Realizar uma aposta
  placeBet: async (bettingEventDTO: {
    contractAddress: string;
    privateKey: string;
    eventId: number;
    outcome: string;
    amount: number;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/place-bet`,
        bettingEventDTO
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao realizar aposta: ${error}`);
    }
  },

  // Realizar um depósito no contrato
  deposit: async (sendBlockChainDTO: {
    fromAddress: string;
    privateKey: string;
    value: number;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/deposit`,
        sendBlockChainDTO
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao depositar: ${error}`);
    }
  },

  // Retirar valores do contrato
  withdraw: async (sendBlockChainDTO: {
    fromAddress: string;
    privateKey: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/withdraw`,
        sendBlockChainDTO
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao retirar: ${error}`);
    }
  },

  // Obter detalhes consolidados de eventos
  getEventDetails: async (contractAddress: string): Promise<EventDetails[]> => {
    try {
      const response = await axios.get<EventDetails[]>(
        `${API_BASE_URL}/details/${contractAddress}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao obter detalhes do evento: ${error}`);
    }
  },

  // Finalizar um evento
  finalizeEvent: async (params: {
    contractAddress: string;
    privateKey: string;
    eventId: number;
    result: string;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${params.contractAddress}/${params.privateKey}/${params.eventId}/${params.result}/finalize`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao finalizar evento: ${error}`);
    }
  },

  // Obter saldo do contrato em Wei e Ether
  getContractBalance: async (params: {
    contractAddress: string;
    privateKey: string;
  }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/balance-contract/${params.contractAddress}/${params.privateKey}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao obter saldo do contrato: ${error}`);
    }
  },
};
