import { translate } from 'react-jhipster';

export interface ITranslatedValue<T> {
  name?: string;
  display?: string;
  value: T;
}

export type TranslatedValueOrKey<T> = ITranslatedValue<T> | string;

export function translatedValue<T>(i18nKey: string): ITranslatedValue<T> {
  return { name: i18nKey, value: undefined, display: i18nKey };
}

export interface ITextTranslationAndValue<T> extends ITranslatedValue<T> {
  icon?: JSX.Element;
  iconUrl?: string;
  splitTop?: boolean;
  selected?: boolean;
}

export function translateItem<T>(i: TranslatedValueOrKey<T>): string {
  const item: ITextTranslationAndValue<T> = typeof i === 'string' ? translatedValue(i as string) : (i as ITextTranslationAndValue<T>);
  let displayText = item.display;
  if (!!item.name) {
    try {
      displayText = translate(item.name);
    } catch (e) {
      console.error('Error with translation', e);
    }
    displayText =
      !displayText || typeof displayText !== 'string' || displayText.toString().startsWith('translation-not-found[')
        ? item.display
        : displayText;
  }
  return displayText;
}
