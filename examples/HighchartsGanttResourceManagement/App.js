import React, {Component} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import {
  GanttSeries,
  HighchartsGanttChart,
  Subtitle,
  Title,
  Tooltip,
  withHighcharts,
  XAxis,
  YAxis
} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';


class App extends Component {

  render() {

    // Set to 00:00:00:000 today
    let today = new Date();
    const day = 1000 * 60 * 60 * 24;
    const map = Highcharts.map;
    const dateFormat = Highcharts.dateFormat;

    // Set to 00:00:00:000 today
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
    today = today.getTime();

    const cars = [{
      model: 'Nissan Leaf',
      current: 0,
      deals: [{
        rentedTo: 'Lisa Star',
        from: today - 1 * day,
        to: today + 2 * day
      }, {
        rentedTo: 'Shane Long',
        from: today - 3 * day,
        to: today - 2 * day
      }, {
        rentedTo: 'Jack Coleman',
        from: today + 5 * day,
        to: today + 6 * day
      }]
    }, {
      model: 'Jaguar E-type',
      current: 0,
      deals: [{
        rentedTo: 'Martin Hammond',
        from: today - 2 * day,
        to: today + 1 * day
      }, {
        rentedTo: 'Linda Jackson',
        from: today - 2 * day,
        to: today + 1 * day
      }, {
        rentedTo: 'Robert Sailor',
        from: today + 2 * day,
        to: today + 6 * day
      }]
    }, {
      model: 'Volvo V60',
      current: 0,
      deals: [{
        rentedTo: 'Mona Ricci',
        from: today + 0 * day,
        to: today + 3 * day
      }, {
        rentedTo: 'Jane Dockerman',
        from: today + 3 * day,
        to: today + 4 * day
      }, {
        rentedTo: 'Bob Shurro',
        from: today + 6 * day,
        to: today + 8 * day
      }]
    }, {
      model: 'Volkswagen Golf',
      current: 0,
      deals: [{
        rentedTo: 'Hailie Marshall',
        from: today - 1 * day,
        to: today + 1 * day
      }, {
        rentedTo: 'Morgan Nicholson',
        from: today - 3 * day,
        to: today - 2 * day
      }, {
        rentedTo: 'William Harriet',
        from: today + 2 * day,
        to: today + 3 * day
      }]
    }, {
      model: 'Peugeot 208',
      current: 0,
      deals: [{
        rentedTo: 'Harry Peterson',
        from: today - 1 * day,
        to: today + 2 * day
      }, {
        rentedTo: 'Emma Wilson',
        from: today + 3 * day,
        to: today + 4 * day
      }, {
        rentedTo: 'Ron Donald',
        from: today + 5 * day,
        to: today + 6 * day
      }]
    }];

    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Car Rental Schedule</Title>
          <XAxis
            currentDateIndicator={true}
          />
          <Tooltip
            pointFormatter={() => '<span>Rented To: {point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>'}
          />
          <YAxis
            type={"category"}
            grid={
              {
                enabled: true,
                columns: [{
                  title: {
                    text: 'Model'
                  },
                  categories: map(series, function (s) {
                    return s.name;
                  })
                }, {
                  title: {
                    text: 'Rented To'
                  },
                  categories: map(series, function (s) {
                    return s.current.rentedTo;
                  })
                }, {
                  title: {
                    text: 'From'
                  },
                  categories: map(series, function (s) {
                    return dateFormat('%e. %b', s.current.from);
                  })
                }, {
                  title: {
                    text: 'To'
                  },
                  categories: map(series, function (s) {
                    return dateFormat('%e. %b', s.current.to);
                  })
                }]
              }
            }
          />
          {
            cars.map(function (car, i) {

              const data = car.deals.map(function (deal) {
                return {
                  id: 'deal-' + i,
                  rentedTo: deal.rentedTo,
                  start: deal.from,
                  end: deal.to,
                  y: i
                };
              });

              return <GanttSeries
                name={car.model}
                data={data}
                current={car.deals[car.current]}
              />;

            })
          }
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
