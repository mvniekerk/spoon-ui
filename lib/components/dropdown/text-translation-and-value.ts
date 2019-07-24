export interface ITextTranslationAndValue<T> {
  name?: string;
  display: string;
  value: T;
  icon?: JSX.Element;
  iconUrl?: string;
  splitTop?: boolean;
  selected?: boolean;
}
