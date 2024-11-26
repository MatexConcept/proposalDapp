import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useContractInstance from "../hooks/useContractInstance";
import { Contract } from "ethers";
import ABI from "../ABI/proposal.json";
import useSignerOrProvider from "../hooks/useSignerOrProvider";

const ProposalContext = createContext({
    proposals: []
})
export const ProposalContextProvider = ({ children }) => {
    const [proposals, setProposals] = useState([]);
    const readOnlyProposalContract = useContractInstance();
    const { readOnlyProvider } = useSignerOrProvider();

    const formatEnum = (value) => {
        const status = Number(value);
        switch (status) {
            case 1:
                return "Created";
            case 2:
                return "Pending";
            case 3:
                return "Accepted";
            default:
                return "Pending";
        }
    }

    const getProposals = useCallback(async () => {
        if (!readOnlyProposalContract) return;

        try {
            const data = await readOnlyProposalContract.getAllProposals();
            const formattedProposal = data.map((proposal) => ({
                title: proposal.name,
                description: proposal.description,
                voteCount: Number(proposal.voteCount),
                quorum: Number(proposal.quorum), 
                status: formatEnum(proposal.status)
            }))

            setProposals(formattedProposal);
        } catch (error) {
            console.log("Error fetching proposal", error);
        }
    }, [readOnlyProposalContract])

    useEffect(() => {
        getProposals();
    }, [getProposals])


 

  

 

    
    

    // const voteOnProposalHandler = useCallback((index, voteCount, status) => {
    //     setProposals((prevState) => {
    //         const updatedProposals = [...prevState];
    //         updatedProposals[Number(index)] = {
    //             ...updatedProposals[Number(index)],
    //             voteCount: Number(voteCount),
    //             status: formatEnum(status),
    //         };
    //         return updatedProposals;
    //     });
    // }, []);

    // useEffect(() => {
    //     const contract = new Contract(
    //         import.meta.env.VITE_PROPOSAL_CONTRACT_ADDRESS,
    //         ABI,
    //         readOnlyProvider
    //     );

       
    //     contract.on("ProposalActive", (proposalIndex, voteCount) => {
          
    //         voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 2); 
    //     });

      
    //     contract.on("ProposalApproved", (proposalIndex, voteCount) => {
        
    //         voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 3); 
    //     });

        
    //     return () => {
    //         contract.off("ProposalActive");
    //         contract.off("ProposalApproved");
    //     };
    // }, [voteOnProposalHandler, readOnlyProvider]);

    

    const voteOnProposalHandler = useCallback((index, voteCount, status) => {
        setProposals((prevState) => {
            const updatedProposals = [...prevState];
            updatedProposals[Number(index)] = {
                ...updatedProposals[Number(index)],
                voteCount: Number(voteCount),
                status: formatEnum(status),
            };
            return updatedProposals;
        });
    }, []);

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_PROPOSAL_CONTRACT_ADDRESS,
            ABI,
            readOnlyProvider
        );

        contract.on("ProposalActive", (proposalIndex, voteCount) => {
            voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 2); // Update to "Pending"
        });

        contract.on("ProposalApproved", (proposalIndex, voteCount) => {
            voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 3);
        });

        return () => {
            contract.off("ProposalActive");
            contract.off("ProposalApproved");
        };
    }, [voteOnProposalHandler, readOnlyProvider]);


    return (
        < ProposalContext.Provider value={{ proposals }}>
            {children}
        </ ProposalContext.Provider>
    )

}


// eslint-disable-next-line react-refresh/only-export-components
export const  useProposal = () => {
    const context = useContext( ProposalContext);
    return context;
}