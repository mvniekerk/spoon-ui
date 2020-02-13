import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import './calendar-input.scss';
import { Input } from '../external';
import { Container } from '../layout';
import { WithPopover } from '../with-popover/with-popover';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import ArrowDropUp from '@material-ui/icons/ArrowDropUpRounded';

interface ICalendarInputProps extends CalendarProps {
  id: string;
  value: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

interface ICalendarInputState {
  isPopoverOpen: boolean;
}

export class CalendarInput extends React.Component<ICalendarInputProps, ICalendarInputState> {
  ref: HTMLElement;

  state = {
    isPopoverOpen: false
  };

  handleChange = date => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(date);
      this.setState({
        isPopoverOpen: false
      });
    }
  };

  handleOpen = () => {
    this.setState({
      isPopoverOpen: true
    });
  };

  captureRef = el => {
    if (el) {
      this.ref = el;
    }
  };

  renderCalendar = () => {
    const { value, onChange, ...other } = this.props;
    return <Calendar onChange={this.handleChange} value={value} {...other} />;
  };

  render() {
    const { value, disabled, placeholder, required } = this.props;
    return (
      <WithPopover
        disabled={disabled}
        isOpen={this.state.isPopoverOpen}
        className="calendar-input"
        mainComponent={<Input readOnly disabled={disabled} placeholder={placeholder} value={(value && value.toDateString()) || ''} />}
        openerIcon={<CalendarIcon />}
        flip
        autoOpen
        autoClose
        required={required}
        closeOnMainClick
        onOpen={this.handleOpen}
      >
        <Container fluid>{this.renderCalendar()}</Container>
      </WithPopover>
    );
  }
}
