import { translate } from 'react-jhipster';

export interface ITranslatedValue<T> {
  name?: string;
  display?: string;
  value: T;
}

export interface ITranslatedSelectableValue<T> extends ITranslatedValue<T> {
  selected?: boolean;
  id?: string;
  disabled?: boolean;
}

export type TranslatedValueOrKey<T> = ITranslatedValue<T> | string;

export function translatedValue<T>(i18nKey: string): ITranslatedValue<T> {
  return { name: i18nKey, value: undefined, display: i18nKey };
}

export function translateItem<T>(i: TranslatedValueOrKey<T>): string {
  const item: ITranslatedValue<T> = typeof i === 'string' ? translatedValue(i as string) : (i as ITranslatedValue<T>);
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
