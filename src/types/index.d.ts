declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

interface RuleDescriptionModalProps {
  show: boolean;
  onHide: () => void;
}
