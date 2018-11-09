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

    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Left Axis as Table</Title>
          <XAxis tickPixelInterval={70}/>
          <YAxis
            type={"category"}
            grid={
              {
                enabled: true,
                borderColor: 'rgba(0,0,0,0.3)',
                borderWidth: 1,
                columns: [{
                  title: {
                    text: 'Project'
                  },
                  labels: {
                    format: '{point.name}'
                  }
                }, {
                  title: {
                    text: 'Assignee'
                  },
                  labels: {
                    format: '{point.assignee}'
                  }
                }, {
                  title: {
                    text: 'Est. days'
                  },
                  labels: {
                    formatter: function () {
                      var point = this.point,
                        days = (1000 * 60 * 60 * 24),
                        number = (point.x2 - point.x) / days;
                      return Math.round(number * 100) / 100;
                    }
                  }
                }, {
                  labels: {
                    format: '{point.start:%e. %b}'
                  },
                  title: {
                    text: 'Start date'
                  }
                }, {
                  title: {
                    text: 'End date'
                  },
                  offset: 30,
                  labels: {
                    format: '{point.end:%e. %b}'
                  }
                }]
              }
            }
          />
          <Tooltip xDateFormat={"%e %b %Y, %H:%M"}/>
          <GanttSeries
            name={"Project 1"}
            data={
              [{
                start: Date.UTC(2017, 10, 18, 8),
                end: Date.UTC(2017, 10, 25, 16),
                name: 'Start prototype',
                assignee: 'Richards',
                y: 0
              }, {
                start: Date.UTC(2017, 10, 20, 8),
                end: Date.UTC(2017, 10, 24, 16),
                name: 'Develop',
                assignee: 'Michaels',
                y: 1
              }, {
                start: Date.UTC(2017, 10, 25, 16),
                end: Date.UTC(2017, 10, 25, 16),
                name: 'Prototype done',
                assignee: 'Richards',
                y: 2
              }, {
                start: Date.UTC(2017, 10, 27, 8),
                end: Date.UTC(2017, 11, 3, 16),
                name: 'Test prototype',
                assignee: 'Richards',
                y: 3
              }, {
                start: Date.UTC(2017, 10, 23, 8),
                end: Date.UTC(2017, 11, 15, 16),
                name: 'Run acceptance tests',
                assignee: 'Halliburton',
                y: 4
              }
              ]
            }
          />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);