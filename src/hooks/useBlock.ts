import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blockchainService } from "../api/ApiBlock";

// Hook principal
export const useBlock = () => {
  const queryClient = useQueryClient();

  // Query para obter o saldo de uma conta específica
  const useBalance = (address: string) =>
    useQuery({
      queryKey: ['getBalance', address],
      queryFn: () => blockchainService.getBalance(address),
    });

  // Query para obter os detalhes do evento
  const useEventDetails = (contractAddress: string) =>
    useQuery({
      queryKey: ['getAllEvent', contractAddress],
      queryFn: () => blockchainService.getEventDetails(contractAddress),
      enabled: !!contractAddress,
      staleTime: 100,
      retry: true,
  
    });

  // Query para obter saldo do contrato
  const useContractBalance = (contractAddress: string, privateKey: string) =>
    useQuery({
      queryKey: ['getContractBalance', privateKey],
      queryFn: () => blockchainService.getContractBalance({ contractAddress, privateKey }),
    });

  // Mutation para criar um evento de apostas
  const useCreateBettingEvent = () =>
    useMutation({
      mutationFn: blockchainService.createBettingEvent,
      onSuccess: () => {
        queryClient.invalidateQueries(); // Invalida todas as queries
      },
    });

  // Mutation para realizar uma aposta
  const usePlaceBet = () =>
    useMutation({
      mutationFn: blockchainService.placeBet,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getContractBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getAllEvent'] });
      },
    });

  // Mutation para realizar um depósito
  const useDeposit = () =>
    useMutation({
      mutationFn: blockchainService.deposit,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getContractBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getAllEvent'] });
      },
    });

  // Mutation para realizar retirada
  const useWithdraw = () =>
    useMutation({
      mutationFn: blockchainService.withdraw,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getContractBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getAllEvent'] });
      },
    });

  // Mutation para finalizar um evento
  const useFinalizeEvent = () =>
    useMutation({
      mutationFn: blockchainService.finalizeEvent,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['getBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getContractBalance'] });
        await queryClient.invalidateQueries({ queryKey: ['getAllEvent'] });
      },
    });

  return {
    useBalance,
    useEventDetails,
    useContractBalance,
    useCreateBettingEvent,
    usePlaceBet,
    useDeposit,
    useWithdraw,
    useFinalizeEvent,
  };
};
