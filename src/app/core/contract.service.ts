import { Web3Service } from './web3.service';
import { Injectable } from '@angular/core';

declare let require: any;
const roulette_artifacts = require('../artifacts/Roulette.json');

@Injectable()
export class ContractService {
  public contracts = {
    'Roulette': {
      artifacts: null,
      deployed: null
    }
  };

  private _ready: Promise<void>;

  constructor(
    private web3Service: Web3Service
  ) {
    console.log(this);

    this._ready = (async () => {
      await web3Service.ready();
      const deployingRoulette = this.storeDeployedContract('Roulette', roulette_artifacts);
      await deployingRoulette;
    })();
  }

  private async storeDeployedContract(name: string, artifacts: any) {
    this.contracts[name].artifacts = await this.web3Service.artifactsToContract(artifacts);
    this.contracts[name].deployed = await this.contracts[name].artifacts.deployed();
  }

  ready(): Promise<any> {
    return this._ready;
  }

  getDeployedContract(contract: string) {
    return this.contracts[contract].deployed;
  }

  newEvent(contract: string, event: string, filter: object = {}) {
    return this.contracts[contract].deployed[event](filter, {fromBlock: 0, toBlock: 'latest'});
  }
}
