import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";

const useVoteOnProposal = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (index) => {
      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.voteOnProposal.estimateGas(index);

        const tx = await contract.voteOnProposal(index, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Voted successfully");
          return;
        }
        toast.error("Failed to Vote on Proposal");
        return;
      } catch (error) {
        const errorDecoder = ErrorDecoder.create();
        const decodedError = await errorDecoder.decode(error);
        console.error("Error Voting on Proposal:", decodedError);
        toast.error(decodedError.reason);
      }
    },
    [address, contract, chainId]
  );
};

export default  useVoteOnProposal;