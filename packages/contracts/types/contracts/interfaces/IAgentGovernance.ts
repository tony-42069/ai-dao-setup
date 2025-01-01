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

export interface IAgentGovernanceInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createProposal"
      | "executeProposal"
      | "getProposalStatus"
      | "voteOnProposal"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "ProposalCreated" | "ProposalExecuted" | "Voted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "createProposal",
    values: [string, BigNumberish, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "executeProposal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProposalStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "voteOnProposal",
    values: [BigNumberish, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "createProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProposalStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voteOnProposal",
    data: BytesLike
  ): Result;
}

export namespace ProposalCreatedEvent {
  export type InputTuple = [proposalId: BigNumberish, creator: AddressLike];
  export type OutputTuple = [proposalId: bigint, creator: string];
  export interface OutputObject {
    proposalId: bigint;
    creator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProposalExecutedEvent {
  export type InputTuple = [proposalId: BigNumberish];
  export type OutputTuple = [proposalId: bigint];
  export interface OutputObject {
    proposalId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VotedEvent {
  export type InputTuple = [
    proposalId: BigNumberish,
    voter: AddressLike,
    support: boolean
  ];
  export type OutputTuple = [
    proposalId: bigint,
    voter: string,
    support: boolean
  ];
  export interface OutputObject {
    proposalId: bigint;
    voter: string;
    support: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IAgentGovernance extends BaseContract {
  connect(runner?: ContractRunner | null): IAgentGovernance;
  waitForDeployment(): Promise<this>;

  interface: IAgentGovernanceInterface;

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

  createProposal: TypedContractMethod<
    [
      description: string,
      value: BigNumberish,
      target: AddressLike,
      data: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;

  executeProposal: TypedContractMethod<
    [proposalId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getProposalStatus: TypedContractMethod<
    [proposalId: BigNumberish],
    [bigint],
    "view"
  >;

  voteOnProposal: TypedContractMethod<
    [proposalId: BigNumberish, support: boolean],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createProposal"
  ): TypedContractMethod<
    [
      description: string,
      value: BigNumberish,
      target: AddressLike,
      data: BytesLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "executeProposal"
  ): TypedContractMethod<[proposalId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getProposalStatus"
  ): TypedContractMethod<[proposalId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "voteOnProposal"
  ): TypedContractMethod<
    [proposalId: BigNumberish, support: boolean],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ProposalCreated"
  ): TypedContractEvent<
    ProposalCreatedEvent.InputTuple,
    ProposalCreatedEvent.OutputTuple,
    ProposalCreatedEvent.OutputObject
  >;
  getEvent(
    key: "ProposalExecuted"
  ): TypedContractEvent<
    ProposalExecutedEvent.InputTuple,
    ProposalExecutedEvent.OutputTuple,
    ProposalExecutedEvent.OutputObject
  >;
  getEvent(
    key: "Voted"
  ): TypedContractEvent<
    VotedEvent.InputTuple,
    VotedEvent.OutputTuple,
    VotedEvent.OutputObject
  >;

  filters: {
    "ProposalCreated(uint256,address)": TypedContractEvent<
      ProposalCreatedEvent.InputTuple,
      ProposalCreatedEvent.OutputTuple,
      ProposalCreatedEvent.OutputObject
    >;
    ProposalCreated: TypedContractEvent<
      ProposalCreatedEvent.InputTuple,
      ProposalCreatedEvent.OutputTuple,
      ProposalCreatedEvent.OutputObject
    >;

    "ProposalExecuted(uint256)": TypedContractEvent<
      ProposalExecutedEvent.InputTuple,
      ProposalExecutedEvent.OutputTuple,
      ProposalExecutedEvent.OutputObject
    >;
    ProposalExecuted: TypedContractEvent<
      ProposalExecutedEvent.InputTuple,
      ProposalExecutedEvent.OutputTuple,
      ProposalExecutedEvent.OutputObject
    >;

    "Voted(uint256,address,bool)": TypedContractEvent<
      VotedEvent.InputTuple,
      VotedEvent.OutputTuple,
      VotedEvent.OutputObject
    >;
    Voted: TypedContractEvent<
      VotedEvent.InputTuple,
      VotedEvent.OutputTuple,
      VotedEvent.OutputObject
    >;
  };
}
