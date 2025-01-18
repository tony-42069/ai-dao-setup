declare module 'ethers' {
  export interface Provider {
    getNetwork(): Promise<Network>;
    getBlockNumber(): Promise<number>;
    getBalance(address: string): Promise<bigint>;
  }

  export interface Signer {
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    connect(provider: Provider): Signer;
  }

  export interface Network {
    chainId: number;
    name: string;
  }

  export class Contract {
    constructor(address: string, abi: any[], signerOrProvider: Signer | Provider);
    connect(signerOrProvider: Signer | Provider): Contract;
  }

  export class JsonRpcProvider implements Provider {
    constructor(url?: string);
    getNetwork(): Promise<Network>;
    getBlockNumber(): Promise<number>;
    getBalance(address: string): Promise<bigint>;
  }

  export class Wallet implements Signer {
    constructor(privateKey: string, provider?: Provider);
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    connect(provider: Provider): Signer;
  }
}
