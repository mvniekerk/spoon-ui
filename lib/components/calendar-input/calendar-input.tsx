import React from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import './calendar-input.scss';
import { Input } from '../external';
import { Container } from '../layout';
import { WithPopover } from '../with-popover/with-popover';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';

interface ICalendarInputProps extends CalendarProps {
  id: string;
  value: Date;
  onChange: (date: Date) => void;
}

export class CalendarInput extends React.Component<ICalendarInputProps> {
  ref: HTMLElement;
  captureRef = el => {
    if (el) {
      this.ref = el;
    }
  };

  renderCalendar = () => {
    const { onChange, value, ...other } = this.props;
    return <Calendar onChange={onChange} value={value} {...other} />;
  };

  render() {
    const { value } = this.props;
    return (
      <WithPopover
        className="calendar-input"
        mainComponent={<Input readOnly value={(value && value.toDateString()) || ''} />}
        openerIcon={<CalendarIcon />}
        flip
        autoOpen
        autoClose
        closeOnMainClick
        onSelfClickClose
      >
        <Container fluid>{this.renderCalendar()}</Container>
      </WithPopover>
    );
  }
}
