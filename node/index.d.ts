export interface Out {
    constName: string;
    fileName: string;
    contractName: string;
}
export interface Config {
    sources: Record<string, string>;
    outs: Array<Out>;
}
export declare function getTs(config: Config): string;
export declare function getSolcOutput(config: Config): any;
