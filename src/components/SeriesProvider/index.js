import React, { Component } from 'react';
import Highcharts from 'highstock-release';
import provideChart from '../ChartProvider';
import providedProps from '../../utils/providedProps';
import cleanPropsBeforeUpdate from '../../utils/cleanPropsBeforeUpdate';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideSeries(WrappedComponent, expectsSeriesExists = true) {
  class SeriesProvider extends Component {
    static displayName = `SeriesProvider(${getDisplayName(WrappedComponent)})`;

    constructor (props, context) {
      super(props, context);

      providedProps(
        'SeriesProvider',
        ['update', 'remove', 'setData', 'setVisible', 'getSeries', 'seriesAdded']
      );

      this.handleSeriesAdded = this.handleSeriesAdded.bind(this);
      this.state = {
        seriesAdded: false
      };
    }

    componentWillMount () {
      const { get, getChart } = this.props;
      const id = this.props.seriesId || this.props.id;

      if (get(id)) {
        return this.setState({
          seriesAdded: true
        });
      }

      Highcharts.addEvent(getChart(), 'addSeries', this.handleSeriesAdded);
    }

    handleSeriesAdded (e) {
      if (e.options.id !== this.props.id) return;

      this.setState({
        seriesAdded: true
      });
    }

    render () {
      const id = this.props.seriesId || this.props.id;
      const series = this.props.get(id);
      if (!series && expectsSeriesExists) return null;

      const update = series && series.update.bind(series);
      const remove = series && series.remove.bind(series);
      const setData = series && series.setData.bind(series);
      const setVisible = series && series.setVisible.bind(series);
      const getSeries = () => this.props.get(id);

      return (
        <WrappedComponent
          {...this.props}
          update={cleanPropsBeforeUpdate(update)}
          remove={remove}
          setData={setData}
          setVisible={setVisible}
          getSeries={getSeries}
          seriesAdded={!!series} />
      );
    }
  }

  return provideChart(SeriesProvider);
}