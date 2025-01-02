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

export interface IDecisionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "executeDecision"
      | "getDecisionStatus"
      | "validateDecision"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "DecisionExecuted" | "DecisionValidated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "executeDecision",
    values: [BigNumberish, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getDecisionStatus",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validateDecision",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeDecision",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDecisionStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateDecision",
    data: BytesLike
  ): Result;
}

export namespace DecisionExecutedEvent {
  export type InputTuple = [decisionId: BigNumberish, executor: AddressLike];
  export type OutputTuple = [decisionId: bigint, executor: string];
  export interface OutputObject {
    decisionId: bigint;
    executor: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DecisionValidatedEvent {
  export type InputTuple = [decisionId: BigNumberish];
  export type OutputTuple = [decisionId: bigint];
  export interface OutputObject {
    decisionId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IDecision extends BaseContract {
  connect(runner?: ContractRunner | null): IDecision;
  waitForDeployment(): Promise<this>;

  interface: IDecisionInterface;

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

  executeDecision: TypedContractMethod<
    [decisionId: BigNumberish, target: AddressLike, data: BytesLike],
    [boolean],
    "nonpayable"
  >;

  getDecisionStatus: TypedContractMethod<
    [decisionId: BigNumberish],
    [bigint],
    "view"
  >;

  validateDecision: TypedContractMethod<
    [decisionId: BigNumberish],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "executeDecision"
  ): TypedContractMethod<
    [decisionId: BigNumberish, target: AddressLike, data: BytesLike],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getDecisionStatus"
  ): TypedContractMethod<[decisionId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "validateDecision"
  ): TypedContractMethod<[decisionId: BigNumberish], [boolean], "view">;

  getEvent(
    key: "DecisionExecuted"
  ): TypedContractEvent<
    DecisionExecutedEvent.InputTuple,
    DecisionExecutedEvent.OutputTuple,
    DecisionExecutedEvent.OutputObject
  >;
  getEvent(
    key: "DecisionValidated"
  ): TypedContractEvent<
    DecisionValidatedEvent.InputTuple,
    DecisionValidatedEvent.OutputTuple,
    DecisionValidatedEvent.OutputObject
  >;

  filters: {
    "DecisionExecuted(uint256,address)": TypedContractEvent<
      DecisionExecutedEvent.InputTuple,
      DecisionExecutedEvent.OutputTuple,
      DecisionExecutedEvent.OutputObject
    >;
    DecisionExecuted: TypedContractEvent<
      DecisionExecutedEvent.InputTuple,
      DecisionExecutedEvent.OutputTuple,
      DecisionExecutedEvent.OutputObject
    >;

    "DecisionValidated(uint256)": TypedContractEvent<
      DecisionValidatedEvent.InputTuple,
      DecisionValidatedEvent.OutputTuple,
      DecisionValidatedEvent.OutputObject
    >;
    DecisionValidated: TypedContractEvent<
      DecisionValidatedEvent.InputTuple,
      DecisionValidatedEvent.OutputTuple,
      DecisionValidatedEvent.OutputObject
    >;
  };
}