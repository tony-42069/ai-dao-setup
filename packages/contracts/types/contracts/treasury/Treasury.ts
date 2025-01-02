/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace ITreasury {
  export type InvestmentStruct = {
    asset: string;
    amount: BigNumberish;
    value: BigNumberish;
  };

  export type InvestmentStructOutput = [
    asset: string,
    amount: bigint,
    value: bigint
  ] & { asset: string; amount: bigint; value: bigint };

  export type TreasuryStateStruct = {
    totalFunds: BigNumberish;
    allocatedFunds: BigNumberish;
    availableFunds: BigNumberish;
    lastUpdated: BigNumberish;
    investmentPortfolio: ITreasury.InvestmentStruct[];
  };

  export type TreasuryStateStructOutput = [
    totalFunds: bigint,
    allocatedFunds: bigint,
    availableFunds: bigint,
    lastUpdated: bigint,
    investmentPortfolio: ITreasury.InvestmentStructOutput[]
  ] & {
    totalFunds: bigint;
    allocatedFunds: bigint;
    availableFunds: bigint;
    lastUpdated: bigint;
    investmentPortfolio: ITreasury.InvestmentStructOutput[];
  };
}

export interface TreasuryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addInvestment"
      | "allocateFunds"
      | "allocatedFunds"
      | "deposit"
      | "getInvestmentOptions"
      | "getState"
      | "investmentPortfolio"
      | "lastUpdated"
      | "owner"
      | "renounceOwnership"
      | "token"
      | "totalFunds"
      | "transactionCount"
      | "transactions"
      | "transferOwnership"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "FundsAllocated"
      | "FundsDeposited"
      | "FundsWithdrawn"
      | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addInvestment",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allocateFunds",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "allocatedFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getInvestmentOptions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getState", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "investmentPortfolio",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdated",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactionCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transactions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addInvestment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allocateFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allocatedFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getInvestmentOptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getState", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "investmentPortfolio",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastUpdated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalFunds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transactionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace FundsAllocatedEvent {
  export type InputTuple = [target: AddressLike, amount: BigNumberish];
  export type OutputTuple = [target: string, amount: bigint];
  export interface OutputObject {
    target: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FundsDepositedEvent {
  export type InputTuple = [from: AddressLike, amount: BigNumberish];
  export type OutputTuple = [from: string, amount: bigint];
  export interface OutputObject {
    from: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FundsWithdrawnEvent {
  export type InputTuple = [to: AddressLike, amount: BigNumberish];
  export type OutputTuple = [to: string, amount: bigint];
  export interface OutputObject {
    to: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Treasury extends BaseContract {
  connect(runner?: ContractRunner | null): Treasury;
  waitForDeployment(): Promise<this>;

  interface: TreasuryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addInvestment: TypedContractMethod<
    [asset: string, amount: BigNumberish, value: BigNumberish],
    [void],
    "nonpayable"
  >;

  allocateFunds: TypedContractMethod<
    [amount: BigNumberish, target: AddressLike],
    [void],
    "nonpayable"
  >;

  allocatedFunds: TypedContractMethod<[], [bigint], "view">;

  deposit: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  getInvestmentOptions: TypedContractMethod<
    [],
    [ITreasury.InvestmentStructOutput[]],
    "view"
  >;

  getState: TypedContractMethod<
    [],
    [ITreasury.TreasuryStateStructOutput],
    "view"
  >;

  investmentPortfolio: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint] & {
        asset: string;
        amount: bigint;
        value: bigint;
      }
    ],
    "view"
  >;

  lastUpdated: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  token: TypedContractMethod<[], [string], "view">;

  totalFunds: TypedContractMethod<[], [bigint], "view">;

  transactionCount: TypedContractMethod<[], [bigint], "view">;

  transactions: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, bigint, boolean] & {
        recipient: string;
        amount: bigint;
        description: string;
        timestamp: bigint;
        executed: boolean;
      }
    ],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [amount: BigNumberish, recipient: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addInvestment"
  ): TypedContractMethod<
    [asset: string, amount: BigNumberish, value: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "allocateFunds"
  ): TypedContractMethod<
    [amount: BigNumberish, target: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "allocatedFunds"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getInvestmentOptions"
  ): TypedContractMethod<[], [ITreasury.InvestmentStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getState"
  ): TypedContractMethod<[], [ITreasury.TreasuryStateStructOutput], "view">;
  getFunction(
    nameOrSignature: "investmentPortfolio"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint] & {
        asset: string;
        amount: bigint;
        value: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "lastUpdated"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalFunds"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transactionCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transactions"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, bigint, boolean] & {
        recipient: string;
        amount: bigint;
        description: string;
        timestamp: bigint;
        executed: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [amount: BigNumberish, recipient: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "FundsAllocated"
  ): TypedContractEvent<
    FundsAllocatedEvent.InputTuple,
    FundsAllocatedEvent.OutputTuple,
    FundsAllocatedEvent.OutputObject
  >;
  getEvent(
    key: "FundsDeposited"
  ): TypedContractEvent<
    FundsDepositedEvent.InputTuple,
    FundsDepositedEvent.OutputTuple,
    FundsDepositedEvent.OutputObject
  >;
  getEvent(
    key: "FundsWithdrawn"
  ): TypedContractEvent<
    FundsWithdrawnEvent.InputTuple,
    FundsWithdrawnEvent.OutputTuple,
    FundsWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "FundsAllocated(address,uint256)": TypedContractEvent<
      FundsAllocatedEvent.InputTuple,
      FundsAllocatedEvent.OutputTuple,
      FundsAllocatedEvent.OutputObject
    >;
    FundsAllocated: TypedContractEvent<
      FundsAllocatedEvent.InputTuple,
      FundsAllocatedEvent.OutputTuple,
      FundsAllocatedEvent.OutputObject
    >;

    "FundsDeposited(address,uint256)": TypedContractEvent<
      FundsDepositedEvent.InputTuple,
      FundsDepositedEvent.OutputTuple,
      FundsDepositedEvent.OutputObject
    >;
    FundsDeposited: TypedContractEvent<
      FundsDepositedEvent.InputTuple,
      FundsDepositedEvent.OutputTuple,
      FundsDepositedEvent.OutputObject
    >;

    "FundsWithdrawn(address,uint256)": TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;
    FundsWithdrawn: TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}