import { ApiPromise, SubmittableResult, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

let api;
let account; 

// 0xe8906553f120a33b3f3dd9759fccf7c7cc174dd5da5f5e796584974de990503a

async function connectAPI() {
        try {
        const outputElement = document.getElementById('log-in-result')!;

        outputElement.textContent = 'Connecting to the WebSocket provider...';

        const privateKey = document.getElementById('privateKey')!.value || '';

        const wsProvider = new WsProvider('wss://testnet-rpc.atleta.network:9944');
    
        api = await ApiPromise.create({ provider: wsProvider });
        const keyring = new Keyring({ type: 'ethereum' });
        account = keyring.addFromUri(privateKey);
    
        outputElement.textContent = `Current genesis block hash: ${api.genesisHash.toHex()}`;
    } catch (error) {
        console.error('Error connecting to the Polkadot API:', error);
        const outputElement = document.getElementById('log-in-result');
        outputElement!.textContent = 'Error connecting to the Polkadot API.';
    }
}

async function performFaucet() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('faucet-result')!;
  const faucetAccount = document.getElementById('faucetAccount')!.value || '0';
  const faucetAmount = BigInt(document.getElementById('faucetAmount')!.value || '0');

  outputElement.textContent = 'Processing faucet...';

  try {
    await new Promise<SubmittableResult>((res, _) => {
          api.tx.faucet.requestFunds(faucetAccount, faucetAmount).send((result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function performStake() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('staking-result')!;
  const amount = BigInt(document.getElementById('amountToStake')!.value || '0');

  outputElement.textContent = 'Processing stake...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.staking.bond(amount, 1).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function performNominate() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('nominate-result')!;
  const textarea = document.getElementById('targetAddresses');
  const rawInput = textarea.value;
  const targets = rawInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  outputElement.textContent = 'Processing nomination...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.staking.nominate(targets).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function performBondExtra() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('bond-extra-result')!;
  const amount = BigInt(document.getElementById('amountToStakeExtra')!.value || '0');

  outputElement.textContent = 'Processing staking...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.staking.bondExtra(amount).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function peraformClaimRewards() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('claim-rewards-result')!;
  const payoutAccount = document.getElementById('payoutAccount')!.value || '0';
  const era = document.getElementById('era')!.value || '0';

  outputElement.textContent = 'Processing claiming rewards...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.staking.payoutStakers(payoutAccount, era).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function performUnBond() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('unstake-result')!;
  const amount = BigInt(document.getElementById('amountToUnstake')!.value || '0');

  outputElement.textContent = 'Processing unstaking...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.staking.unbond(amount).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function submitProposal() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('submit-proposal-result')!;
  const proposalHash = document.getElementById('proposalHash')!.value || '0';
  const proposalAmount = BigInt(document.getElementById('proposalAmount')!.value || '0');

  outputElement.textContent = 'Processing submitting proposal...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.democracy.propose({ Inline: proposalHash }, proposalAmount).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function supportVote() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('support-vote-result')!;
  const amountToVoteAgain = BigInt(document.getElementById('amountToVote')!.value || '0');
  const refIndex = document.getElementById('refIndexSuppor')!.value || '0';

  outputElement.textContent = 'Processing voting support...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.democracy.vote(refIndex, { Standard: { balance: amountToVoteAgain, vote: { aye: true, conviction: 1 } } }).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

async function againstVote() {
  if (!api) {
      console.error('API is not connected');
      return;
  }

  const outputElement = document.getElementById('against-vote-result')!;
  const amountToVoteAgain = BigInt(document.getElementById('amountToVoteAgain')!.value || '0');
  const refIndex = document.getElementById('refIndexSupport')!.value || '0';

  outputElement.textContent = 'Processing voting against...';

  try {
      const join_result = await new Promise<SubmittableResult>((res, _) => {
          api.tx.democracy.vote(refIndex, { Standard: { balance: amountToVoteAgain, vote: { aye: false, conviction: 1 } } }).signAndSend(account, (result: SubmittableResult) => {
              console.log(`Tx status: ${result.status}`);
              outputElement.textContent = "Block number result:" + result.blockNumber!.toString();
          });
      });
  } catch (error) {
      console.error('Error sending transaction:', error);
      outputElement.textContent = 'Error sending transaction.';
  }
}

document.getElementById("log-in-button")!.addEventListener("click", connectAPI);

// Extrinsics.
document.getElementById("faucet-button")!.addEventListener("click", performFaucet);
document.getElementById("stake-button")!.addEventListener("click", performStake);
document.getElementById("nominate-button")!.addEventListener("click", performNominate);
document.getElementById("bond-extra-button")!.addEventListener("click", performBondExtra);
document.getElementById("claim-rewards-button")!.addEventListener("click", peraformClaimRewards);
document.getElementById("unstake-button")!.addEventListener("click", performUnBond);

document.getElementById("submit-proposal-button")!.addEventListener("click", submitProposal);
document.getElementById("support-vote-button")!.addEventListener("click", supportVote);
document.getElementById("against-vote-button")!.addEventListener("click", againstVote);
