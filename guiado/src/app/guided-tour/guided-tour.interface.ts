export interface IModuleGuide {
    moduleId: string;
    steps: Array<IGuide>;
    stateGuide?: boolean;
}
export interface IGuide {
    target: string;
    description: string;
    stateGuide?: boolean;
}

export interface IConfigurationGuide {
    aplication?: string;
    backgroundRGBA?: string;
    textColorHex?: string;
    opacity?: number;
}