export const getTopTransfersFromTeams = (data) => {
    let transfers : any = [];

    for(const teamTransfers of data){
       if (!Array.isArray(teamTransfers?.data)) continue;

        for(const transfer of teamTransfers?.data){
           if(transfer.amount){
            transfers.push(transfer)
           }
        }
    }

     const top3TransfersByAmount = transfers
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

    return top3TransfersByAmount;
}

export const getPositions = (data) => {
  const positions = Array.from(
    new Set(
      data
        ?.filter(
          (transfer) => transfer?.amount && transfer.position
        )
        .map((transfer) => transfer.position)
    )
  );
  return positions;
};

export const getTypes = (data) => {
  return Array.from(
    new Set(
      data
        ?.filter((transfer) => transfer?.amount && transfer?.transfer_direction)
        .map((transfer) => transfer.transfer_direction)
    )
  );
};
export const getTeams = (data) => {
  return Array.from(
    new Set(
      data
        ?.filter((transfer) => transfer?.amount && transfer?.from_team)
        .map((transfer) => transfer.from_team)
    )
  );
};

export function filterTransfers({
  transfers,
  selectedTeam,
  selectedType,
  selectedPosition,
}) {
    
  return transfers?.filter((transfer) => {
    const teamMatch = transfer?.amount && selectedTeam.includes(transfer?.from_team); 
    const typeMatch = transfer?.amount && selectedType.includes(transfer?.transfer_direction);
    const positionMatch = transfer?.amount && selectedPosition.includes(transfer?.position);


    return teamMatch && typeMatch && positionMatch;
  });
}
