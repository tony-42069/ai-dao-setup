/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IAgentGovernance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAgentGovernance__factory>;
    getContractFactory(
      name: "IAIAgent",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAIAgent__factory>;
    getContractFactory(
      name: "IDecision",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDecision__factory>;
    getContractFactory(
      name: "ITreasury",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ITreasury__factory>;
    getContractFactory(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock__factory>;
    getContractFactory(
      name: "SADLToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SADLToken__factory>;
    getContractFactory(
      name: "Treasury",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Treasury__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IAgentGovernance",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAgentGovernance>;
    getContractAt(
      name: "IAIAgent",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAIAgent>;
    getContractAt(
      name: "IDecision",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IDecision>;
    getContractAt(
      name: "ITreasury",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ITreasury>;
    getContractAt(
      name: "Lock",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Lock>;
    getContractAt(
      name: "SADLToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SADLToken>;
    getContractAt(
      name: "Treasury",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Treasury>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Pausable>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IAgentGovernance",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAgentGovernance>;
    deployContract(
      name: "IAIAgent",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAIAgent>;
    deployContract(
      name: "IDecision",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IDecision>;
    deployContract(
      name: "ITreasury",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ITreasury>;
    deployContract(
      name: "Lock",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "SADLToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SADLToken>;
    deployContract(
      name: "Treasury",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Treasury>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "Pausable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Pausable>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "IAgentGovernance",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAgentGovernance>;
    deployContract(
      name: "IAIAgent",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAIAgent>;
    deployContract(
      name: "IDecision",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IDecision>;
    deployContract(
      name: "ITreasury",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ITreasury>;
    deployContract(
      name: "Lock",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "SADLToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.SADLToken>;
    deployContract(
      name: "Treasury",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Treasury>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
