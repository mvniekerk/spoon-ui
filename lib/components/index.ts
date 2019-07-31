import ActionBanner from './action-banner/action-banner';
import AddToFromList from './add-to-from-list/add-to-from-list';
import Alert from './alert/alert';
import Button from './button/button';
import Checkbox from './selection/checkbox';
import ColorPicker from './color-picker/color-picker';
import ColorThemeEditor from './color-theme-editor/color-theme-editor';
import ColorVariableSetter from './color-variable-setter/color-variable-setter';
import ContextMenu from './context-menu/context-menu';
import ErrorBoundaryRoute from './error/error-boundary-route';
import ErrorBoundary from './error/error-boundary';
import Footer from './footer/footer';
import { FormError } from './form-error/form-error';
import Header from './header/header';
import ItemsPerPage from './items-per-page/items-per-page';
import { Brand, BrandIcon, NavDropdown, Notification } from './header/header-components';
import * as Dropdown from './dropdown';
import MenuItem from './sidemenu/menuitem';
import Pagination from './pagination/pagination';
import ProgressBar from './progress-bar/progress-bar';
import ProgressionItem from './progression/progression-item';
import Progression from './progression/progression';
import RadioButton from './selection/radiobutton';
import { IRadioButtonValue } from './selection/radio-button-value';
import RadioGroup from './selection/radiogroup';
import SearchBar from './search-bar/search-bar';
import SideMenu from './sidemenu/sidemenu';
import TableHeader from './table/table-header';
import TagButton from './tag-button/tag-button';
import TagInput from './tag-input/tag-input';
import Toggle from './selection/toggle';
/* tslint:disable:no-duplicate-imports */
import { ITextTranslationAndValue, translateItem } from './dropdown';

export {
  // Functions
  translateItem,
  // Interfaces
  IRadioButtonValue,
  ITextTranslationAndValue,
  // Components
  ActionBanner,
  AddToFromList,
  Alert,
  Brand,
  BrandIcon,
  Button,
  Checkbox,
  ColorPicker,
  ColorThemeEditor,
  ColorVariableSetter,
  ContextMenu,
  Dropdown,
  ErrorBoundary,
  ErrorBoundaryRoute,
  Footer,
  FormError,
  Header,
  ItemsPerPage,
  MenuItem,
  NavDropdown,
  Notification,
  Pagination,
  ProgressBar,
  ProgressionItem,
  Progression,
  RadioButton,
  RadioGroup,
  SearchBar,
  SideMenu,
  TableHeader,
  TagButton,
  TagInput,
  Toggle
};
